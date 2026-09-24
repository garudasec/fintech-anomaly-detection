import React, { createContext, useContext } from "react";
import { getAnalystProfile, updateAnalystProfile, AnalystProfile } from "@/data/repository";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface ProfileContextType {
  profile: AnalystProfile;
  setProfile: (profile: AnalystProfile) => Promise<void>;
}

const defaultProfile: AnalystProfile = {
  name: "M. Okafor",
  email: "analyst@fintech-sentinel.local",
  role: "Lead Risk Analyst",
  timezone: "UTC",
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["analyst-profile"],
    queryFn: getAnalystProfile,
    initialData: defaultProfile,
  });

  const profile = data ?? defaultProfile;

  const setProfile = async (newProfile: AnalystProfile) => {
    const updated = await updateAnalystProfile(newProfile);
    queryClient.setQueryData(["analyst-profile"], updated);
    queryClient.invalidateQueries({ queryKey: ["analyst-profile"] });
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
