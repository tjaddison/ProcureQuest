import { useState, useEffect } from 'react';
import { PlayerState } from '../types/game';
import { scenarios } from '../data/scenarios';
import MetricsDisplay from './MetricsDisplay';

interface GameSummaryProps {
  playerState: PlayerState | null;
  onRestart: () => void;
}

const GameSummary = ({ playerState, onRestart }: GameSummaryProps) => {
  const [showBadge, setShowBadge] = useState(false);
  
  useEffect(() => {
    // Show badge with animation after a delay
    const timer = setTimeout(() => {
      setShowBadge(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!playerState) return null;
  
  // Calculate performance metrics
  const optimalDecisions = scenarios.filter(scenario => {
    const playerDecision = playerState.decisions[scenario.id];
    if (!playerDecision) return false;
    
    const decision = scenario.decision.options.find(opt => opt.id === playerDecision);
    return decision?.isOptimal || false;
  }).length;
  
  const optimalPercentage = Math.round((optimalDecisions / scenarios.length) * 100);
  
  // Determine player rank based on score and optimal decisions
  const determineRank = () => {
    if (optimalPercentage >= 90) return { title: 'Procurement Virtuoso', description: 'A true supply chain visionary!' };
    if (optimalPercentage >= 75) return { title: 'Strategic Procurement Leader', description: 'Exceptional strategic thinking!' };
    if (optimalPercentage >= 60) return { title: 'Skilled Procurement Professional', description: 'You have solid procurement instincts!' };
    if (optimalPercentage >= 40) return { title: 'Procurement Specialist', description: 'You understand the basics well!' };
    return { title: 'Procurement Apprentice', description: 'Keep learning and growing!' };
  };
  
  const rank = determineRank();
  
  // Determine strongest area based on final metrics
  const determineStrength = () => {
    const { budget, risk, stability, reputation } = playerState.metrics;
    const budgetPerformance = budget / 10000000 * 100; // Convert to percentage of initial
    const riskPerformance = 100 - risk; // Invert so higher is better
    
    const scores = [
      { area: 'Financial Management', score: budgetPerformance },
      { area: 'Risk Management', score: riskPerformance },
      { area: 'Supply Chain Stability', score: stability },
      { area: 'Stakeholder Relations', score: reputation }
    ];
    
    scores.sort((a, b) => b.score - a.score);
    return scores[0].area;
  };
  
  const strength = determineStrength();
  
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-2">Procurement Challenge Complete!</h2>
        <p className="text-xl text-blue-300">You've completed all 12 procurement scenarios</p>
      </div>
      
      {/* Badge and score */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
        <div className={`relative transition-all duration-1000 ${showBadge ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="w-48 h-48 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-44 h-44 bg-blue-900 rounded-full flex flex-col items-center justify-center p-4 text-center">
              <span className="text-yellow-400 text-4xl font-bold">{playerState.score}</span>
              <span className="text-blue-200 text-sm">POINTS</span>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {optimalPercentage}% OPTIMAL
          </div>
        </div>
        
        <div className="bg-blue-800 p-6 rounded-lg max-w-md">
          <h3 className="text-2xl font-bold text-white mb-2">{rank.title}</h3>
          <p className="text-blue-200 mb-4">{rank.description}</p>
          <p className="text-blue-100">
            <span className="text-green-400 font-medium">Strength:</span> {strength}
          </p>
          <p className="text-blue-100">
            <span className="text-yellow-400 font-medium">Optimal Decisions:</span> {optimalDecisions} out of {scenarios.length}
          </p>
        </div>
      </div>
      
      {/* Final metrics */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-white">Final Company Metrics</h3>
        <MetricsDisplay metrics={playerState.metrics} />
      </div>
      
      {/* Decision history */}
      <div className="bg-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Your Procurement Journey</h3>
        <div className="space-y-3">
          {scenarios.map(scenario => {
            const decisionId = playerState.decisions[scenario.id];
            const decision = scenario.decision.options.find(opt => opt.id === decisionId);
            
            return (
              <div key={scenario.id} className="bg-blue-700 p-3 rounded-lg flex items-center">
                <div className="mr-3 font-medium text-blue-200">{scenario.id}.</div>
                <div className="flex-grow">
                  <h4 className="text-white">{scenario.title}</h4>
                  {decision && (
                    <p className={`text-sm ${decision.isOptimal ? 'text-green-400' : 'text-blue-200'}`}>
                      {decision.text}
                    </p>
                  )}
                </div>
                {decision?.isOptimal && (
                  <div className="text-green-400 text-sm font-medium">
                    Optimal ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-center">
        <button
          onClick={onRestart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameSummary;