import React, { useState } from "react"
import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FlexBox } from "../../../common";

const StyledTextField = styled(TextField)`
    width: 330px;
`;

export const DashboardHeader = React.memo(() => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const textValue = React.useMemo(() => searchParams.get('searchText'), [searchParams]);
    const [searchValue, setSearchValue] = useState(textValue ?? '');

    React.useEffect(() => {
        if (textValue) {
            setSearchValue(textValue);
        }
    }, [textValue])

    const onChangeHandler = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(ev.target.value);
        if (!ev.target.value) {
            searchParams.delete('searchText');
            setSearchParams(searchParams);
            return;
        }
        searchParams.set('searchText', ev.target.value);
        searchParams.set('pageNumber', "1");
        setSearchParams(searchParams)
    }, [searchParams, setSearchParams]);

    const onClick = React.useCallback(() => {
        navigate('/');
    }, [navigate])

    return (
        <FlexBox justifyContent="space-evenly" alignItems="center" width="100%" height="100px">
            <StyledTextField onChange={onChangeHandler} value={searchValue} label="Filter" autoComplete="off" />
            <Button onClick={onClick}>Logout</Button>
        </FlexBox>
    );
}) 