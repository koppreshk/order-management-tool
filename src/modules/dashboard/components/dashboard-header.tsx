import React from "react"
import { TextField } from "@mui/material";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { FlexBox } from "../../../common";

const StyledTextField = styled(TextField)`
    width: 330px;
`;

export const DashboardHeader = React.memo(() => {
    const [searchParams, setSearchParams] = useSearchParams();

    const onChangeHandler = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        searchParams.set('searchText', ev.target.value);
        setSearchParams(searchParams)
    }, [searchParams, setSearchParams]);

    return (
        <FlexBox justifyContent="center"  alignItems="center" width="100%" height="100px">
            <StyledTextField onChange={onChangeHandler} label="Filter" autoComplete="off"/>
        </FlexBox>
    );
}) 