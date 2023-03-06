import { Button } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { FlexBox } from "../../../common";
import * as orders from "../mock-data/mock-data.json";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from "@mui/material/Typography/Typography";

const Table = styled.table`
    width: 920px;
    height: 462px;
    table-layout: fixed;
    font-family: arial, sans-serif;
    border-collapse: collapse;

    tbody {
        height: 438px;
    }
    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
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
        filteredData = filteredData.filter((item) => {
            console.log()
            return (
                item.orderId.includes(searchTextValue) ||
                item.pickupDate.includes(searchTextValue) ||
                item.vendorName.toLowerCase().includes(searchTextValue.toLowerCase()) ||
                item.status.toLowerCase().includes(searchTextValue.toLowerCase())
            )
        })
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

    return (
        <FlexBox justifyContent="center" alignItems="center" width="100%" height="calc(100% - 100px)" flexDirection="column">
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
                    {paginatedData.length ?
                        paginatedData.map((order) => {
                            return (
                                <tr key={order.orderId}>
                                    <td title={order.orderId}>{order.orderId}</td>
                                    <td title={order.vendorName}>{order.vendorName}</td>
                                    <td title={order.pickupDate}>{order.pickupDate}</td>
                                    <td title={order.status}>{order.status}</td>
                                </tr>
                            )
                        })
                        : <tr><td colSpan={4} style={{ textAlign: "center" }}>No records matched the search text</td></tr>
                    }
                </tbody>
            </Table>
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
    const pageValue = searchParams.get('pageNumber');
    const buttonContainerRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        if (!pageValue) {
            searchParams.set('pageNumber', '1')
            setSearchParams(searchParams)
        }
    }, [searchParams, setSearchParams, pageValue])

    React.useEffect(() => {
        buttonRef.current && buttonRef.current.scrollIntoView({ behavior: 'auto' })
    }, []);

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


    const onLeftClick = React.useCallback(() => buttonContainerRef.current!.scrollBy({ behavior: 'smooth', left: -50 }), []);
    const onRightClick = React.useCallback(() => buttonContainerRef.current!.scrollBy({ behavior: 'smooth', left: 50 }), []);

    return (
        <>
            <FlexBox width="600px" gap="10px" alignItems="center" padding={'10px'}>
                <ArrowBackIosIcon onClick={onLeftClick} />
                <FlexBox ref={buttonContainerRef} width="450px" overflowX="hidden">
                    {
                        pagesArray.map((pageNumber) => <Button
                            sx={{ outline: Number(pageValue) === pageNumber ? '2px solid #0077D9' : '', outlineOffset: '-2px' }}
                            value={pageNumber}
                            ref={Number(pageValue) === pageNumber ? buttonRef : null}
                            key={pageNumber}
                            onClick={onPageClick}>{pageNumber}</Button>)
                    }
                </FlexBox>
                <ArrowForwardIosIcon onClick={onRightClick} />
            </FlexBox>
            <Typography variant="body1">Total Search Count: {data.length}</Typography>
        </>
    )
})