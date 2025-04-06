import { useEffect, useState } from 'react';
import { PlayerState, Scenario } from '../types/game';
import MetricsDisplay from './MetricsDisplay';

interface DashboardProps {
  playerState: PlayerState | null;
  currentScenario: Scenario | null;
  onStartScenario: () => void;
  onMultiplayerSetup: () => void;
  isMultiplayer: boolean;
  roomId: string | null;
  onLeaveRoom: () => void;
}

const Dashboard = ({
  playerState,
  currentScenario,
  onStartScenario,
  onMultiplayerSetup,
  isMultiplayer,
  roomId,
  onLeaveRoom
}: DashboardProps) => {
  const [showTutorial, setShowTutorial] = useState(false);
  
  // Show tutorial on first visit
  useEffect(() => {
    if (playerState && playerState.completedScenarios.length === 0) {
      setShowTutorial(true);
    }
  }, [playerState]);
  
  if (!playerState || !currentScenario) return null;
  
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Header with player info */}
      <div className="bg-blue-800 rounded-lg p-4 mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">Procurement Manager: {playerState.name}</h2>
          <p className="text-blue-200">Score: {playerState.score}</p>
        </div>
        
        <div className="flex gap-2">
          {isMultiplayer ? (
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-sm">Room: {roomId}</span>
              <button 
                onClick={onLeaveRoom}
                className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
              >
                Leave Room
              </button>
            </div>
          ) : (
            <button 
              onClick={onMultiplayerSetup}
              className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Multiplayer
            </button>
          )}
        </div>
      </div>
      
      {/* Company metrics */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-200">Company Metrics</h3>
        <MetricsDisplay metrics={playerState.metrics} />
      </div>
      
      {/* Current scenario preview */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-lg p-6 mb-6 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="inline-block bg-blue-700 text-blue-200 px-3 py-1 rounded-full text-sm mb-2">
              Scenario {currentScenario.id} of 12
            </span>
            <h3 className="text-2xl font-bold text-white">{currentScenario.title}</h3>
          </div>
          
          <button
            onClick={onStartScenario}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
          >
            Start Scenario
          </button>
        </div>
        
        <p className="text-blue-100 mb-4">{currentScenario.issue}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-blue-800 bg-opacity-50 p-3 rounded">
            <h4 className="font-bold text-yellow-300 mb-1">Challenge:</h4>
            <p className="text-blue-100">{currentScenario.challenge}</p>
          </div>
          <div className="bg-blue-800 bg-opacity-50 p-3 rounded">
            <h4 className="font-bold text-green-300 mb-1">Opportunity:</h4>
            <p className="text-blue-100">{currentScenario.opportunity}</p>
          </div>
        </div>
      </div>
      
      {/* Progress tracker */}
      <div className="bg-blue-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2 text-white">Progress Tracker</h3>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((scenarioNum) => (
            <div 
              key={scenarioNum}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${playerState.completedScenarios.includes(scenarioNum) 
                ? 'bg-green-600 text-white' 
                : scenarioNum === currentScenario.id 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-blue-700 text-blue-300'}`}
            >
              {scenarioNum}
            </div>
          ))}
        </div>
      </div>
      
      {/* Tutorial modal */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-blue-900 p-6 rounded-xl max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Welcome to ProcureQuest!</h3>
            <p className="text-blue-100 mb-4">
              As the Procurement Manager, you&apos;ll face 12 challenging scenarios that test your strategic thinking and business acumen.
            </p>
            <div className="space-y-3 mb-6">
              <div className="bg-blue-800 p-3 rounded">
                <h4 className="text-yellow-300 font-bold">How to Play:</h4>
                <ol className="list-decimal list-inside text-blue-100 ml-2 space-y-1">
                  <li>Review each scenario and understand the procurement challenge</li>
                  <li>Analyze supplier data, market information, and performance metrics</li>
                  <li>Make strategic decisions based on the available information</li>
                  <li>See the impact of your decisions on your company&apos;s metrics</li>
                  <li>Learn from optimal strategies to improve your procurement skills</li>
                </ol>
              </div>
              
              <div className="bg-blue-800 p-3 rounded">
                <h4 className="text-green-300 font-bold">Key Metrics:</h4>
                <ul className="list-disc list-inside text-blue-100 ml-2 space-y-1">
                  <li><span className="text-green-400 font-medium">Budget:</span> Your available financial resources</li>
                  <li><span className="text-red-400 font-medium">Risk:</span> Your company&apos;s exposure to supply chain disruptions</li>
                  <li><span className="text-blue-400 font-medium">Stability:</span> The reliability of your operations</li>
                  <li><span className="text-purple-400 font-medium">Reputation:</span> Your company&apos;s standing with stakeholders</li>
                </ul>
              </div>
            </div>
            <button 
              onClick={() => setShowTutorial(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium w-full"
            >
              Got it, let&apos;s get started!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;