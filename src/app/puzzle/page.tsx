"use client";

import { useState } from "react";
import OrientationGuard from "../../components/OrientationGuard";
import LittleLoveCheck from "../../components/LittleLoveCheck";
import PhotoPairGame from "../../components/PhotoPairGame";
import ValentinesProposal from "../../components/ValentinesProposal";

export default function PuzzlePage() {
  const [passedLoveCheck, setPassedLoveCheck] = useState(false);
  const [showProposal, setShowProposal] = useState(false);

  return (
    <OrientationGuard>
      {/* STEP 1: Little Love Check */}
      {!passedLoveCheck && (
        <LittleLoveCheck onSuccess={() => setPassedLoveCheck(true)} />
      )}

      {/* STEP 2: Puzzle Game */}
      {passedLoveCheck && !showProposal && (
        <PhotoPairGame handleShowProposal={() => setShowProposal(true)} />
      )}

      {/* STEP 3: Proposal */}
      {showProposal && <ValentinesProposal />}
    </OrientationGuard>
  );
}
