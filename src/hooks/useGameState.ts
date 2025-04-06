"use client";

import { useEffect, useState } from 'react';
import { scenarios, initialGameMetrics } from '../data/scenarios';
import { PlayerState, GameMetrics } from '../types/game';

// Local storage keys
const PLAYER_STATE_KEY = 'procureQuest_playerState';
const MULTIPLAYER_KEY = 'procureQuest_multiplayer';

// Initialize a new player state
const initializePlayerState = (playerName: string): PlayerState => {
  return {
    name: playerName,
    currentScenarioId: 1,
    completedScenarios: [],
    metrics: { ...initialGameMetrics },
    decisions: {},
    score: 0,
    lastUpdated: Date.now()
  };
};

export const useGameState = () => {
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMultiplayer, setIsMultiplayer] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);

  // Initialize game state on component mount
  useEffect(() => {
    const loadSavedState = () => {
      try {
        const savedState = localStorage.getItem(PLAYER_STATE_KEY);
        if (savedState) {
          const parsedState = JSON.parse(savedState) as PlayerState;
          setPlayerState(parsedState);
        }
        
        const multiplayerData = localStorage.getItem(MULTIPLAYER_KEY);
        if (multiplayerData) {
          const parsedData = JSON.parse(multiplayerData);
          setIsMultiplayer(true);
          setRoomId(parsedData.roomId);
        }
      } catch (error) {
        console.error('Error loading saved game state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedState();
  }, []);

  // Create a new player state
  const startNewGame = (playerName: string) => {
    const newPlayerState = initializePlayerState(playerName);
    setPlayerState(newPlayerState);
    savePlayerState(newPlayerState);
  };

  // Save the current player state to local storage
  const savePlayerState = (state: PlayerState) => {
    try {
      const stateToSave = {
        ...state,
        lastUpdated: Date.now()
      };
      localStorage.setItem(PLAYER_STATE_KEY, JSON.stringify(stateToSave));
      setPlayerState(stateToSave);
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  };

  // Make a decision in the current scenario
  const makeDecision = (decisionId: string) => {
    if (!playerState) return;

    const currentScenario = scenarios.find(s => s.id === playerState.currentScenarioId);
    if (!currentScenario) return;

    const decision = currentScenario.decision.options.find(opt => opt.id === decisionId);
    if (!decision) return;

    // Calculate new metrics based on decision impact
    const newMetrics: GameMetrics = {
      budget: Math.max(0, playerState.metrics.budget + decision.impact.budget),
      risk: Math.max(0, Math.min(100, playerState.metrics.risk + decision.impact.risk)),
      stability: Math.max(0, Math.min(100, playerState.metrics.stability + decision.impact.stability)),
      reputation: Math.max(0, Math.min(100, playerState.metrics.reputation + decision.impact.reputation))
    };

    // Calculate score based on the decision
    const scoreIncrease = decision.isOptimal ? 100 : Math.max(0, 50 - Math.abs(decision.impact.budget / 20000));

    // Update player state with new metrics, decision, and advance to next scenario
    const updatedState: PlayerState = {
      ...playerState,
      metrics: newMetrics,
      decisions: {
        ...playerState.decisions,
        [currentScenario.id]: decisionId
      },
      completedScenarios: [...playerState.completedScenarios, currentScenario.id],
      currentScenarioId: Math.min(scenarios.length, currentScenario.id + 1),
      score: playerState.score + scoreIncrease,
    };

    savePlayerState(updatedState);
  };

  // Start or join a multiplayer session
  const startMultiplayerSession = (roomId: string, isHost: boolean = true) => {
    if (!playerState) return false;

    try {
      const sessionData = {
        roomId,
        isHost,
        playerId: playerState.name,
      };

      localStorage.setItem(MULTIPLAYER_KEY, JSON.stringify(sessionData));
      setIsMultiplayer(true);
      setRoomId(roomId);
      
      // In a real implementation, this would connect to a backend service
      // For this example, we'll just simulate multiplayer locally
      
      return true;
    } catch (error) {
      console.error('Error starting multiplayer session:', error);
      return false;
    }
  };

  // Leave the current multiplayer session
  const leaveMultiplayerSession = () => {
    try {
      localStorage.removeItem(MULTIPLAYER_KEY);
      setIsMultiplayer(false);
      setRoomId(null);
      return true;
    } catch (error) {
      console.error('Error leaving multiplayer session:', error);
      return false;
    }
  };

  // Reset game state and start a new game
  const resetGame = () => {
    if (!playerState) return;
    
    const newPlayerState = initializePlayerState(playerState.name);
    savePlayerState(newPlayerState);
  };

  return {
    playerState,
    isLoading,
    isMultiplayer,
    roomId,
    startNewGame,
    makeDecision,
    resetGame,
    startMultiplayerSession,
    leaveMultiplayerSession
  };
};