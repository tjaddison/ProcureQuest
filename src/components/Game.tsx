"use client";

import { useState, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { scenarios } from '../data/scenarios';
import { Scenario } from '../types/game';
import WelcomeScreen from './WelcomeScreen';
import Dashboard from './Dashboard';
import ScenarioView from './ScenarioView';
import DecisionView from './DecisionView';
import FeedbackView from './FeedbackView';
import GameSummary from './GameSummary';
import LoadingScreen from './LoadingScreen';
import MultiplayerSetup from './MultiplayerSetup';

export type GamePhase = 'welcome' | 'dashboard' | 'scenario' | 'analysis' | 'decision' | 'feedback' | 'summary' | 'multiplayer';

const Game = () => {
  const {
    playerState,
    isLoading,
    isMultiplayer,
    roomId,
    startNewGame,
    makeDecision,
    resetGame,
    startMultiplayerSession,
    leaveMultiplayerSession
  } = useGameState();

  const [gamePhase, setGamePhase] = useState<GamePhase>('welcome');
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'overview' | 'performance' | 'market'>('overview');
  
  // Handle phase transitions based on player state
  useEffect(() => {
    if (isLoading) return;
    
    if (!playerState) {
      setGamePhase('welcome');
      return;
    }
    
    // Find the current scenario the player is on
    const scenario = scenarios.find(s => s.id === playerState.currentScenarioId);
    setCurrentScenario(scenario || null);
    
    // If player has completed all scenarios, show summary
    if (playerState.completedScenarios.length >= scenarios.length) {
      setGamePhase('summary');
      return;
    }
    
    // If coming from welcome screen, show dashboard first
    if (gamePhase === 'welcome') {
      setGamePhase('dashboard');
    }
  }, [playerState, isLoading, gamePhase]);
  
  // Handle decision selection
  const handleDecisionSelect = (decisionId: string) => {
    setSelectedDecisionId(decisionId);
  };
  
  // Submit the player's decision
  const handleDecisionSubmit = () => {
    if (!selectedDecisionId) return;
    
    makeDecision(selectedDecisionId);
    setGamePhase('dashboard');
  };
  
  // Continue to next scenario
  const handleContinue = () => {
    setSelectedDecisionId(null);
    setGamePhase('dashboard');
    setActiveView('overview');
  };
  
  // Start a new game with player name
  const handleStartGame = (playerName: string) => {
    startNewGame(playerName);
  };
  
  // Reset and start a new game
  const handleRestart = () => {
    resetGame();
    setGamePhase('welcome');
  };
  
  // Set up multiplayer
  const handleMultiplayerSetup = () => {
    setGamePhase('multiplayer');
  };
  
  // Start or join a multiplayer session
  const handleCreateRoom = (roomName: string) => {
    if (startMultiplayerSession(roomName)) {
      setGamePhase('dashboard');
    }
  };
  
  // Leave a multiplayer session
  const handleLeaveRoom = () => {
    if (leaveMultiplayerSession()) {
      setGamePhase('dashboard');
    }
  };
  
  // Show different screens based on game phase
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  switch (gamePhase) {
    case 'welcome':
      return <WelcomeScreen onStartGame={handleStartGame} />;
      
    case 'dashboard':
      return (
        <Dashboard 
          playerState={playerState}
          currentScenario={currentScenario}
          onStartScenario={() => setGamePhase('scenario')}
          onMultiplayerSetup={handleMultiplayerSetup}
          isMultiplayer={isMultiplayer}
          roomId={roomId}
          onLeaveRoom={handleLeaveRoom}
        />
      );
      
    case 'scenario':
      return (
        <ScenarioView 
          scenario={currentScenario}
          activeView={activeView}
          onViewChange={(view) => setActiveView(view)}
          onContinue={() => setGamePhase('decision')}
        />
      );
      
    case 'decision':
      return (
        <DecisionView 
          scenario={currentScenario}
          selectedDecisionId={selectedDecisionId}
          onDecisionSelect={handleDecisionSelect}
          onSubmit={handleDecisionSubmit}
          onBack={() => setGamePhase('scenario')}
        />
      );
      
    case 'feedback':
      return (
        <FeedbackView 
          scenario={currentScenario}
          decision={selectedDecisionId ? currentScenario?.decision.options.find(d => d.id === selectedDecisionId) : null}
          onContinue={handleContinue}
        />
      );
      
    case 'summary':
      return (
        <GameSummary 
          playerState={playerState}
          onRestart={handleRestart}
        />
      );
      
    case 'multiplayer':
      return (
        <MultiplayerSetup 
          isMultiplayer={isMultiplayer}
          roomId={roomId}
          onCreateRoom={handleCreateRoom}
          onLeaveRoom={handleLeaveRoom}
          onCancel={() => setGamePhase('dashboard')}
        />
      );
      
    default:
      return <LoadingScreen />;
  }
};

export default Game;