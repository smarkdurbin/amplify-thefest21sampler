"use client";

import Performer from "../_types/Performer";
import clearSeenRandomPerformerIds from "../_functions/clearSeenRandomPerformerIds";
import getLikedPerformerIds from "../_functions/getLikedPerformerIds";
import getPerformers from "../_functions/getPerformers";
import getSeenRandomPerformerIds from "../_functions/getSeenRandomPerformerIds";
import likePerformer from "../_functions/likePerformer";
import unlikePerformer from "../_functions/unlikePerformer";
import { useEffect, useState } from "react";

const usePerformers = () => {
  // State
  const [error, setError] = useState<any>();
  const [likedPerformerIds, setLikedPerformerIds] = useState<string[]>();
  const [performers, setPerformers] = useState<Performer[]>();
  const [seenRandomPerformerIds, setSeenRandomPerformerIds] =
    useState<string[]>();

  // On component mount, get performers
  useEffect(() => {
    // Get performers
    getPerformers()
      .then((_performers) => {
        // Set performers
        setPerformers(_performers);
      })
      .catch((error) => {
        // Set error
        setError(error);

        // Set performers
        setPerformers(undefined);
      });

    return () => {
      // Set performers
      setPerformers(undefined);
    };
  }, []);

  // On component mount, get liked performer IDs
  useEffect(() => {
    // Get liked performer IDs
    getLikedPerformerIds().then((_likedPerformerIds) => {
      // Set liked performer IDs
      setLikedPerformerIds(_likedPerformerIds);
    });

    return () => {
      // Set liked performer IDs
      setLikedPerformerIds(undefined);
    };
  }, []);

  // On component mount, get seen random performer IDs
  useEffect(() => {
    // Get seen random performer IDs
    getSeenRandomPerformerIds().then((_seenRandomPerformerIds) => {
      // Set seen random performer IDs
      setSeenRandomPerformerIds(_seenRandomPerformerIds);
    });

    return () => {
      // Set seen random performer IDs
      setSeenRandomPerformerIds(undefined);
    };
  }, []);

  return {
    error,
    likedPerformerIds,
    likePerformer,
    performers,
    seenRandomPerformerIds,
    unlikePerformer,
  };
};

export default usePerformers;
