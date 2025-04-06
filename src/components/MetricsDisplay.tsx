import { GameMetrics } from '../types/game';

interface MetricsDisplayProps {
  metrics: GameMetrics;
}

const MetricsDisplay = ({ metrics }: MetricsDisplayProps) => {
  const formatBudget = (budget: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(budget);
  };
  
  // Helper to determine color classes based on metric values
  const getColorClass = (value: number, metric: keyof GameMetrics) => {
    switch (metric) {
      case 'budget':
        if (value > 8000000) return 'text-green-400';
        if (value > 5000000) return 'text-yellow-400';
        return 'text-red-400';
      case 'risk':
        if (value < 30) return 'text-green-400';
        if (value < 60) return 'text-yellow-400';
        return 'text-red-400';
      case 'stability':
      case 'reputation':
        if (value > 75) return 'text-green-400';
        if (value > 50) return 'text-yellow-400';
        return 'text-red-400';
      default:
        return 'text-white';
    }
  };
  
  const getBgColorClass = (value: number, metric: keyof GameMetrics) => {
    switch (metric) {
      case 'budget':
        if (value > 8000000) return 'bg-green-600';
        if (value > 5000000) return 'bg-yellow-600';
        return 'bg-red-600';
      case 'risk':
        if (value < 30) return 'bg-green-600';
        if (value < 60) return 'bg-yellow-600';
        return 'bg-red-600';
      case 'stability':
      case 'reputation':
        if (value > 75) return 'bg-green-600';
        if (value > 50) return 'bg-yellow-600';
        return 'bg-red-600';
      default:
        return 'bg-blue-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Budget */}
      <div className="bg-blue-800 rounded-lg p-4 relative overflow-hidden">
        <div className="z-10 relative">
          <p className="text-blue-300 text-sm font-medium mb-1">Budget</p>
          <h4 className={`text-2xl font-bold ${getColorClass(metrics.budget, 'budget')}`}>
            {formatBudget(metrics.budget)}
          </h4>
        </div>
        <div className="absolute bottom-0 left-0 h-1 bg-blue-700 w-full">
          <div 
            className={`h-full ${getBgColorClass(metrics.budget, 'budget')}`} 
            style={{ width: `${Math.min(100, (metrics.budget / 10000000) * 100)}%` }}
          ></div>
        </div>
      </div>
      
      {/* Risk */}
      <div className="bg-blue-800 rounded-lg p-4 relative overflow-hidden">
        <div className="z-10 relative">
          <p className="text-blue-300 text-sm font-medium mb-1">Risk Exposure</p>
          <h4 className={`text-2xl font-bold ${getColorClass(metrics.risk, 'risk')}`}>
            {metrics.risk}/100
          </h4>
        </div>
        <div className="absolute bottom-0 left-0 h-1 bg-blue-700 w-full">
          <div 
            className={`h-full ${getBgColorClass(metrics.risk, 'risk')}`} 
            style={{ width: `${metrics.risk}%` }}
          ></div>
        </div>
      </div>
      
      {/* Stability */}
      <div className="bg-blue-800 rounded-lg p-4 relative overflow-hidden">
        <div className="z-10 relative">
          <p className="text-blue-300 text-sm font-medium mb-1">Supply Chain Stability</p>
          <h4 className={`text-2xl font-bold ${getColorClass(metrics.stability, 'stability')}`}>
            {metrics.stability}/100
          </h4>
        </div>
        <div className="absolute bottom-0 left-0 h-1 bg-blue-700 w-full">
          <div 
            className={`h-full ${getBgColorClass(metrics.stability, 'stability')}`} 
            style={{ width: `${metrics.stability}%` }}
          ></div>
        </div>
      </div>
      
      {/* Reputation */}
      <div className="bg-blue-800 rounded-lg p-4 relative overflow-hidden">
        <div className="z-10 relative">
          <p className="text-blue-300 text-sm font-medium mb-1">Company Reputation</p>
          <h4 className={`text-2xl font-bold ${getColorClass(metrics.reputation, 'reputation')}`}>
            {metrics.reputation}/100
          </h4>
        </div>
        <div className="absolute bottom-0 left-0 h-1 bg-blue-700 w-full">
          <div 
            className={`h-full ${getBgColorClass(metrics.reputation, 'reputation')}`} 
            style={{ width: `${metrics.reputation}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;