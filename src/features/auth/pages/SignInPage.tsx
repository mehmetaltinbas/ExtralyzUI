import React, { useState } from 'react';
import { authService } from '../../auth/services/auth.service';
import type { SignInDto } from '../types/auth-dtos';
import { Navigate } from 'react-router-dom';
import { BlackButton } from '../../../shared/components/buttons/BlackButton';

export function SignInPage() {
    const [signInDto, setSignInDto] = useState<SignInDto>({
        userName: '',
        password: '',
    });
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    async function handleSignInSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const response = await authService.signIn(signInDto);
        alert(response.message);
        setIsSignedIn(response.isSuccess);
    }

    return isSignedIn ? (
        <Navigate to="/workspace" />
    ) : (
        <div className="h-[75%] flex flex-col justify-center items-center gap-2">
            <p className=" text-lg">Sign In</p>
            <input
                onChange={(event) => setSignInDto({
                    ...signInDto,
                    userName: event.target.value
                })}
                type="text"
                value={signInDto.userName}
                placeholder="username..."
                className="p-2 border rounded-full"
            />
            <input
                onChange={(event) => setSignInDto({
                    ...signInDto,
                    password: event.target.value
                })}
                value={signInDto.password}
                type="password"
                placeholder="password..."
                className="p-2 border rounded-full"
            />
            <BlackButton onClick={handleSignInSubmit}>sign in</BlackButton>
            <p>or</p>
            <BlackButton
                onClick={event => window.location.href = '/sign-up'}
            >sign up</BlackButton>
        </div>
    );
}
