import React from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { FlexBox } from "../../../common";
import * as orders from "../mock-data/mock-data.json";

const Table = styled.table`
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
        height: 100%;
    }

    tbody{
        max-height: 650px;
        overflow-y: auto;
    }
    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }  
`;

const useFilter = () => {
    const [searchParams] = useSearchParams();
    const searchTextValue = searchParams.get('searchText');
    let filteredData = orders.data;
    if (searchTextValue) {
        filteredData = filteredData.filter((item) => item.orderId.includes(searchTextValue) ||
            item.pickupDate.includes(searchTextValue) ||
            item.vendorName.toLowerCase().includes(searchTextValue) ||
            item.status.toLowerCase().includes(searchTextValue))
    }
    return filteredData;
}

export const DashboardContent = React.memo(() => {
    const data = useFilter();
    const [searchParams] = useSearchParams();

    const paginatedData = React.useMemo(() => {
        const currentPageValue = searchParams.get('pageNumber');
        const startIndex = (Number(currentPageValue!) * 10 - 1) - 9;
        return data.slice(startIndex, startIndex + 10);
    }, [data, searchParams]);
    console.log('paginatedData: ', paginatedData);
    return (
        <FlexBox justifyContent="center" alignItems="center" width="100%" height="calc(100% - 100px)" flexDirection="column">
            <div style={{ overflow: 'scroll', height: '500px' }}>
                <Table>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Vendor Name</th>
                            <th>Pick up date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((order) => {
                            return (
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{order.vendorName}</td>
                                    <td>{order.pickupDate}</td>
                                    <td>{order.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
            <Pagination data={data} />
        </FlexBox>
    );
})

const Pagination = React.memo((props: {
    data: {
        orderId: string;
        vendorName: string;
        pickupDate: string;
        status: string;
    }[]
}) => {
    const { data } = props;
    const totalPageCount = React.useMemo(() => Math.round(data.length / 10), [data.length]);
    const [searchParams, setSearchParams] = useSearchParams();

    React.useEffect(() => {
        const pageValue = searchParams.get('pageNumber');
        if (!pageValue) {
            searchParams.set('pageNumber', '1')
            setSearchParams(searchParams)
        }
    }, [searchParams, setSearchParams])
    const pagesArray = React.useMemo(() => {
        const array = [];
        for (let i = 1; i <= totalPageCount; i++) {
            array.push(i);
        }
        return array;
    }, [totalPageCount])

    const onPageClick = React.useCallback((ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        searchParams.set('pageNumber', ev.currentTarget.value)
        setSearchParams(searchParams)
    }, [searchParams, setSearchParams]);

    return (
        <FlexBox gap="10px" width="1000px" flexWrap="wrap">
            {
                pagesArray.map((pageNumber) => <button value={pageNumber} key={pageNumber} onClick={onPageClick}>{pageNumber}</button>)
            }
        </FlexBox>
    )
})