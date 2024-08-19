import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ChangeAvatar from "@/components/Settings/ChangeAvatar";

const SettingsPage = () => {
  return (
    <div className="container mx-auto p-6 mt-16">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Account Settings
        </h2>

        <Tabs defaultValue="avatar" className="w-full">
          <TabsList className="flex justify-center mb-6">
            <TabsTrigger value="avatar">Change Avatar</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
            <TabsTrigger value="email">Change Email</TabsTrigger>
          </TabsList>

          <TabsContent value="avatar">
            <ChangeAvatar />
          </TabsContent>
          <TabsContent value="password">
            <ChangeAvatar />
          </TabsContent>
          <TabsContent value="email">
            <ChangeAvatar />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
