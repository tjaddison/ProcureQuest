import { useState, useEffect } from 'react';
import { Scenario, Decision } from '../types/game';

interface FeedbackViewProps {
  scenario: Scenario | null;
  decision: Decision | null;
  onContinue: () => void;
}

const FeedbackView = ({ scenario, decision, onContinue }: FeedbackViewProps) => {
  const [showOptimal, setShowOptimal] = useState(false);
  
  // Show optimal decision after a delay for dramatic effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOptimal(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!scenario || !decision) return null;
  
  const isOptimalDecision = decision.isOptimal;
  
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <span className="inline-block bg-blue-700 text-blue-200 px-3 py-1 rounded-full text-sm mb-2">
          Decision Outcome
        </span>
        <h2 className="text-3xl font-bold text-white">{scenario.title}</h2>
      </div>
      
      {/* Impact visualization */}
      <div className="bg-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-6 text-white">Your Decision Impacted the Company</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Budget impact */}
          <div className="bg-blue-700 p-4 rounded-lg">
            <h4 className="font-medium text-blue-200 mb-2">Budget Impact</h4>
            <p className={`text-2xl font-bold ${decision.impact.budget >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(decision.impact.budget)}
            </p>
          </div>
          
          {/* Risk impact */}
          <div className="bg-blue-700 p-4 rounded-lg">
            <h4 className="font-medium text-blue-200 mb-2">Risk Impact</h4>
            <p className={`text-2xl font-bold flex items-center ${decision.impact.risk <= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {decision.impact.risk <= 0 ? '↓' : '↑'} {Math.abs(decision.impact.risk)} pts
            </p>
          </div>
          
          {/* Stability impact */}
          <div className="bg-blue-700 p-4 rounded-lg">
            <h4 className="font-medium text-blue-200 mb-2">Stability Impact</h4>
            <p className={`text-2xl font-bold flex items-center ${decision.impact.stability >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {decision.impact.stability >= 0 ? '↑' : '↓'} {Math.abs(decision.impact.stability)} pts
            </p>
          </div>
          
          {/* Reputation impact */}
          <div className="bg-blue-700 p-4 rounded-lg">
            <h4 className="font-medium text-blue-200 mb-2">Reputation Impact</h4>
            <p className={`text-2xl font-bold flex items-center ${decision.impact.reputation >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {decision.impact.reputation >= 0 ? '↑' : '↓'} {Math.abs(decision.impact.reputation)} pts
            </p>
          </div>
        </div>
        
        {/* Decision summary */}
        <div className="mb-6">
          <h4 className="font-medium text-blue-200 mb-2">Your Decision:</h4>
          <div className={`p-4 rounded-lg ${isOptimalDecision ? 'bg-green-900 border border-green-700' : 'bg-blue-900 border border-blue-700'}`}>
            <p className="text-white">{decision.text}</p>
          </div>
        </div>
      </div>
      
      {/* Optimal decision reveal */}
      <div className="bg-blue-900 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Industry Best Practice</h3>
        
        {showOptimal ? (
          <div className="animate-fadeIn">
            <div className="p-4 bg-green-800 rounded-lg mb-4">
              <h4 className="text-green-300 font-medium mb-1">Optimal Decision:</h4>
              <p className="text-white">{scenario.decision.optimalDecision}</p>
            </div>
            
            {isOptimalDecision && (
              <div className="p-4 bg-blue-800 rounded-lg mb-4">
                <p className="text-green-400 font-medium">Congratulations! You selected the optimal decision for this scenario.</p>
              </div>
            )}
            
            {decision.explanation && (
              <div className="p-4 bg-blue-800 rounded-lg">
                <h4 className="text-blue-300 font-medium mb-1">Why This Works:</h4>
                <p className="text-white">{decision.explanation}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center p-8">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-blue-300">Analyzing decision impact...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Continue button */}
      <div className="flex justify-end">
        <button
          onClick={onContinue}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
        >
          Continue to Next Scenario
        </button>
      </div>
    </div>
  );
};

export default FeedbackView;