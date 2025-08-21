import React, { useState } from 'react';
import { authService } from '../services/auth/auth.service';
import type { SignInDto } from '../services/auth/types/auth-dtos';
import { Navigate } from 'react-router-dom';
import { NavyBlueButton } from '../components/buttons/NavyBlueButton';

export function SignInPage() {
    const [signInDto, setSignInDto] = useState<SignInDto>({
        userName: '',
        password: '',
    });
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const key = event.target.dataset.key as keyof SignInDto | undefined;
        const value = event.target.value;
        if (key) {
            setSignInDto(prev => ({
                ...prev,
                [key]: value
            }));
        }
    }

    async function handleSignInSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const response = await authService.signIn(signInDto);
        alert(response.message);
        setIsSignedIn(response.isSuccess);
    }

    return isSignedIn ? <Navigate to='/workspace' /> : (<div className="h-[75%] flex flex-col justify-center items-center gap-2">
            <p className="font-bold text-lg">Sign In</p>
            <input
                data-key='userName'
                onChange={event => handleOnChange(event)}
                type="text"
                value={signInDto.userName}
                placeholder="username..."
                className="p-2 border rounded-full"
            />
            <input
                data-key='password'
                onChange={event => handleOnChange(event)}
                value={signInDto.password}
                type="password"
                placeholder="password..."
                className="p-2 border rounded-full"
            />
            <NavyBlueButton handleOnClick={handleSignInSubmit}>
                sign in
            </NavyBlueButton>
        </div>)
    ;
}
