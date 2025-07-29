// src/app/(website)/settings/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Logout from '@/components/Signout';
import { createClient } from '@/utils/supabase/client';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface UserProfile {
  email: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
}

const SettingsPage = () => {
  const supabase = createClient();
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);

        if (session) {
          const { data, error: profileError } = await supabase
            .from('User')
            .select('email, username, avatarUrl, created_at')
            .eq('email', session.user.email)
            .single();

          if (profileError) {
            throw profileError;
          }

          if (data) {
            setProfile({
              email: data.email,
              username: data.username,
              avatar_url: data.avatarUrl,
              created_at: data.created_at,
            });
          } else {
            setError('Profile data not found for this user.');
          }
        } else {
          setError('You must be logged in to view settings.');
        }
      } catch (err: any) {
        console.error('Error fetching data:', err.message);
        setError(`Failed to load data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionAndProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        if (newSession) {
          fetchSessionAndProfile();
        } else {
          setProfile(null);
          setLoading(false);
          setError('You have been signed out.');
        }
      }
    );

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
        <p>Loading settings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </CardHeader>
          <CardContent>
            {!session && (
              <Button onClick={() => window.location.href = '/login'} className="w-full mt-4">
                Go to Login
              </Button>
            )}
            {session && (
              <Button onClick={() => window.location.reload()} className="w-full mt-4">
                Retry
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Access Denied</CardTitle>
            <CardDescription className="text-center">You must be logged in to view this page.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = '/login'} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    // Increased vertical padding and removed flex-justify-center
    // to allow content to sit higher, and ensure full width by removing px-6
    <div className="min-h-screen bg-background py-12 px-4 md:px-6 lg:px-8">
      {/* Removed shadow and border from Card, adjusted padding */}
      <Card className="w-full bg-background shadow-none border-none p-0">
        <CardHeader className="text-center px-4 md:px-6"> {/* Ensure header padding is consistent */}
          <CardTitle className="text-3xl font-bold">Settings</CardTitle>
          <CardDescription>Manage your profile and account settings.</CardDescription>
        </CardHeader>
        <CardContent className="px-4 md:px-6"> {/* Ensure content padding is consistent */}
          {profile ? (
            <>
              <div className="flex flex-col items-center space-y-4 mb-6">
                <Avatar className="h-24 w-24 border-4 border-primary">
                  <AvatarImage src={profile.avatar_url || "https://github.com/shadcn.png"} alt="User Avatar" />
                  <AvatarFallback>{profile.username ? profile.username.charAt(0).toUpperCase() : (profile.email ? profile.email.charAt(0).toUpperCase() : 'U')}</AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-semibold">{profile.username || 'User'}</h3>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Details */}
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-muted-foreground">Profile Details</h4>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Username</p>
                    <p className="text-base text-foreground/80">{profile.username || 'Not set'}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-base text-foreground/80">{profile.email}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-base text-foreground/80">
                      {new Date(profile.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Account Actions */}
                <div className="space-y-4 flex flex-col items-start md:items-end">
                    <h4 className="text-lg font-semibold text-muted-foreground">Account Actions</h4>
                    <Logout />
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-muted-foreground">No profile data available. Please ensure your profile is created in Supabase.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;