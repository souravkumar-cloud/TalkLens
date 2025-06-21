import React, { useState } from 'react';
import { UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';
import MyImage from '../assets/signupImage.png';
import { signup } from '../lib/api';

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authUser'] })
  });

  const handleSignup = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Left */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-2">
            <UserIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              TalkLens
            </span>
          </div>

          {error && (
            <div className='alert alert-error mb-4'>
                <span>{error.response.data.message}</span>
            </div>
          )}

          <form onSubmit={handleSignup}>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Create an Account</h2>
                <p className="text-sm opacity-70">Join TalkLens and start your language learning adventure!</p>
              </div>

              <div className="space-y-3">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input input-bordered w-full"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="input input-bordered w-full"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="*********"
                    className="input input-bordered w-full"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long.</p>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input type="checkbox" className="checkbox checkbox-sm" required />
                    <span className="text-xs leading-tight">
                      I agree to the{' '}
                      <span className="text-primary hover:underline cursor-pointer">terms of service</span> and{' '}
                      <span className="text-primary hover:underline cursor-pointer">privacy policy</span>
                    </span>
                  </label>
                </div>
              </div>

              <button className="btn btn-primary w-full" type="submit">
                {isPending ? 
                (
                    <div>
                        <span className='loading loading-spinner loading-xs'></span>
                        Loading...
                    </div>
                )
                 : ('Create Account')}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Right */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col bg-green-900/35">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src={MyImage} alt="Signup" className="h-full w-full object-cover rounded-xl" />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
