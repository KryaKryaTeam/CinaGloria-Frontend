"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import container from "@/core/Container";
import { ModalState } from "@/state/ModalState";
import ProfileWidget from "../widgets/profile/ProfileWidget";
export const ProfileModal = observer(() => {
  const modalState = container.get(ModalState);
  if (!modalState.isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={() => modalState.closeModal()}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {}
        <ProfileWidget profileId={modalState.selectedProfileId || ""} />
      </div>
    </div>
  );
});
