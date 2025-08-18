import React, { useState } from 'react';
import { authService } from '../services/auth/auth.service';
import type { SignInDto } from '../services/auth/types/auth-dtos';
import { Navigate } from 'react-router-dom';

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
                value={signInDto.userName}
                type="text"
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
            <button onClick={event => handleSignInSubmit(event)} className="px-2 py-[2px] border rounded-[10px] bg-[#0d408c] text-white text-sm">
                sign in
            </button>
        </div>)
    ;
}
