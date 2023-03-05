import React from "react"
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

    const onChangeHandler = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        searchParams.set('searchText', ev.target.value);
        setSearchParams(searchParams)
    }, [searchParams, setSearchParams]);

    const onClick = React.useCallback(() => {
        navigate('/');
    }, [navigate])

    return (
        <FlexBox justifyContent="space-evenly" alignItems="center" width="100%" height="100px">
            <StyledTextField onChange={onChangeHandler} label="Filter" autoComplete="off" />
            <Button onClick={onClick}>Logout</Button>
        </FlexBox>
    );
}) 