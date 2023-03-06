import React from "react";
import { Button, TextField, Typography } from "@mui/material"
import styled from "styled-components"
import { FlexBox } from "../../../common"
import SendIcon from '@mui/icons-material/Send';
import * as userData from '../mock-data/mock-data.json';
import { useNavigate } from "react-router-dom";

const StyledTextField = styled(TextField)`
    width: 330px;
`;

const StyledButton = styled(Button)`
    width: 330px;
`;

type State = {
    userName: string;
    password: string;
}

type Action = {
    type: string;
    payload: {
        userName: string;
        password: string;
    }
}
function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'userName':
            return { ...state, userName: action.payload.userName }
        case 'password':
            return { ...state, password: action.payload.password }
        default:
            throw new Error("Cannot update state");
    }
}

export const LoginPage = () => {
    const [state, dispath] = React.useReducer(reducer, { userName: '', password: '' })
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    const onUserNameChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        dispath({ type: 'userName', payload: { userName: ev.target.value, password: state.password } });
    }, [state.password]);

    const onPassowrdChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        dispath({ type: 'password', payload: { password: ev.target.value, userName: state.userName } });
    }, [state.userName]);

    const onSubmitHandler = React.useCallback((ev: any) => {
        ev.preventDefault();
        const foundUser = userData.regesteredUsers.find((user) => user.userName === state.userName)
        if (!foundUser) {
            setError('User does not exist');
        }
        else if (foundUser && foundUser.password === state.password) {
            navigate('/dashboard');
            return setError('');
        }
        else {
            setError('Incorrect password, please try again with the correct password');
        }
    }, [state, navigate]);

    return (
        <form onSubmit={onSubmitHandler} style={{ width: '100%', height: '100%' }}>
            <FlexBox width="100%" height="100%" flexDirection="column" gap="20px" justifyContent="center" alignItems="center">
                <Typography variant="h4">Login</Typography>
                <StyledTextField label="UserName/Email" variant="outlined" type="text" onChange={onUserNameChange} />
                <StyledTextField label="Password" variant="outlined" type="password" onChange={onPassowrdChange} />
                {error.length ? <Typography variant="body2" color="red">{error}</Typography> : null}
                <StyledButton variant="contained" endIcon={<SendIcon />} type="submit">
                    SUMBIT
                </StyledButton>
            </FlexBox>
        </form>
    )
}