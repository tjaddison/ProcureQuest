import { useState } from 'react';
import { Scenario, Decision } from '../types/game';

interface DecisionViewProps {
  scenario: Scenario | null;
  selectedDecisionId: string | null;
  onDecisionSelect: (id: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const DecisionView = ({ 
  scenario, 
  selectedDecisionId,
  onDecisionSelect,
  onSubmit,
  onBack 
}: DecisionViewProps) => {
  const [isConfirming, setIsConfirming] = useState(false);
  
  if (!scenario) return null;
  
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <span className="inline-block bg-blue-700 text-blue-200 px-3 py-1 rounded-full text-sm mb-2">
          Decision Point
        </span>
        <h2 className="text-3xl font-bold text-white">{scenario.title}</h2>
      </div>
      
      {/* Decision prompt */}
      <div className="bg-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Your Decision</h3>
        <p className="text-lg text-blue-100 mb-6">{scenario.decision.prompt}</p>
        
        {/* Decision options */}
        <div className="space-y-4">
          {scenario.decision.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onDecisionSelect(option.id)}
              className={`w-full text-left p-4 rounded-lg transition-colors ${selectedDecisionId === option.id
                ? 'bg-blue-600 border-2 border-blue-400' 
                : 'bg-blue-700 hover:bg-blue-650'}`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${selectedDecisionId === option.id ? 'bg-blue-400' : 'bg-blue-800'}`}>
                  {selectedDecisionId === option.id && (
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-white">{option.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Cost information */}
      <div className="bg-blue-900 rounded-lg p-4 mb-8">
        <h3 className="text-lg font-medium mb-2 text-blue-200">Financial Implications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-800 p-3 rounded-lg">
            <span className="text-sm text-blue-300">Estimated Quote</span>
            <p className="text-xl font-bold text-green-400">{scenario.decision.quote}</p>
          </div>
          <div className="bg-blue-800 p-3 rounded-lg">
            <span className="text-sm text-blue-300">Transition Cost</span>
            <p className="text-xl font-bold text-yellow-400">{scenario.decision.transitionCost}</p>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Back to Analysis
        </button>
        
        <button
          onClick={() => setIsConfirming(true)}
          disabled={!selectedDecisionId}
          className={`px-6 py-3 rounded-lg font-bold transition-colors ${selectedDecisionId 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
        >
          Submit Decision
        </button>
      </div>
      
      {/* Confirmation modal */}
      {isConfirming && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-blue-900 p-6 rounded-xl max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Your Decision</h3>
            <p className="text-blue-100 mb-6">
              Are you sure you want to proceed with this decision? This will impact your company's metrics and cannot be undone.
            </p>
            
            {selectedDecisionId && (
              <div className="bg-blue-800 p-3 rounded-lg mb-6">
                <p className="text-white">
                  {scenario.decision.options.find(opt => opt.id === selectedDecisionId)?.text}
                </p>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setIsConfirming(false)}
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setIsConfirming(false);
                  onSubmit();
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
              >
                Confirm Decision
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecisionView;