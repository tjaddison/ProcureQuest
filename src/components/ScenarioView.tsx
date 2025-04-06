import { Scenario } from '../types/game';

interface ScenarioViewProps {
  scenario: Scenario | null;
  activeView: 'overview' | 'performance' | 'market';
  onViewChange: (view: 'overview' | 'performance' | 'market') => void;
  onContinue: () => void;
}

const ScenarioView = ({ scenario, activeView, onViewChange, onContinue }: ScenarioViewProps) => {
  if (!scenario) return null;
  
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <span className="inline-block bg-blue-700 text-blue-200 px-3 py-1 rounded-full text-sm mb-2">
          Scenario {scenario.id} of 12
        </span>
        <h2 className="text-3xl font-bold text-white">{scenario.title}</h2>
      </div>
      
      {/* Navigation tabs */}
      <div className="flex border-b border-blue-700 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${activeView === 'overview' ? 'text-white border-b-2 border-blue-400' : 'text-blue-300 hover:text-white'}`}
          onClick={() => onViewChange('overview')}
        >
          Scenario Overview
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeView === 'performance' ? 'text-white border-b-2 border-blue-400' : 'text-blue-300 hover:text-white'}`}
          onClick={() => onViewChange('performance')}
        >
          Supplier Performance
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeView === 'market' ? 'text-white border-b-2 border-blue-400' : 'text-blue-300 hover:text-white'}`}
          onClick={() => onViewChange('market')}
        >
          Market Intelligence
        </button>
      </div>
      
      {/* Content based on active view */}
      <div className="bg-blue-800 rounded-lg p-6 mb-6">
        {activeView === 'overview' && (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-white">Situation</h3>
              <p className="text-blue-100 mb-4">{scenario.issue}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-700 bg-opacity-50 p-4 rounded">
                  <h4 className="font-bold text-yellow-300 mb-1">Challenge:</h4>
                  <p className="text-blue-100">{scenario.challenge}</p>
                </div>
                <div className="bg-blue-700 bg-opacity-50 p-4 rounded">
                  <h4 className="font-bold text-green-300 mb-1">Opportunity:</h4>
                  <p className="text-blue-100">{scenario.opportunity}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">Affected Suppliers</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-blue-900 rounded-lg overflow-hidden">
                  <thead className="bg-blue-700">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                        Supplier Name
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                        Contract #
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                        Annual Spend
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-800">
                    {scenario.suppliers.map((supplier, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-blue-100">{supplier.name}</td>
                        <td className="px-4 py-3 text-sm text-blue-100 font-mono">{supplier.contractNumber}</td>
                        <td className="px-4 py-3 text-sm text-blue-100">{supplier.annualSpend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeView === 'performance' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Supplier Performance Analysis</h3>
            {scenario.supplierPerformance ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(scenario.supplierPerformance).map(([supplierName, data]) => {
                  const deliveryRiskColor = 
                    data.deliveryRisk === 'Low' ? 'bg-green-600' :
                    data.deliveryRisk === 'Medium' ? 'bg-yellow-600' : 'bg-red-600';
                  
                  return (
                    <div key={supplierName} className="bg-blue-700 p-4 rounded-lg">
                      <h4 className="font-bold text-white mb-2">{supplierName}</h4>
                      
                      <div className="flex items-center mb-3">
                        <span className="text-sm text-blue-200 w-32">Delivery Risk:</span>
                        <span className={`text-sm px-2 py-1 rounded ${deliveryRiskColor} text-white`}>
                          {data.deliveryRisk}
                        </span>
                      </div>
                      
                      {data.qualityScore !== undefined && (
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-blue-200">Quality Score:</span>
                            <span className="text-white">{data.qualityScore}/100</span>
                          </div>
                          <div className="w-full bg-blue-800 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${data.qualityScore > 85 ? 'bg-green-500' : data.qualityScore > 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${data.qualityScore}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {data.innovationRating !== undefined && (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-blue-200">Innovation Rating:</span>
                            <span className="text-white">{data.innovationRating}/100</span>
                          </div>
                          <div className="w-full bg-blue-800 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${data.innovationRating > 85 ? 'bg-green-500' : data.innovationRating > 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${data.innovationRating}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-blue-200">No supplier performance data available for this scenario.</p>
            )}
          </div>
        )}
        
        {activeView === 'market' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Market Intelligence</h3>
            
            {scenario.marketData ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-700 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-200 mb-2">Market Trends</h4>
                  <ul className="space-y-2">
                    {scenario.marketData.trends?.map((trend, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-400 mr-2">↗</span>
                        <span className="text-blue-100">{trend}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-700 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-200 mb-2">Identified Risks</h4>
                  <ul className="space-y-2">
                    {scenario.marketData.risks?.map((risk, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-400 mr-2">⚠</span>
                        <span className="text-blue-100">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-700 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-200 mb-2">Emerging Opportunities</h4>
                  <ul className="space-y-2">
                    {scenario.marketData.opportunities?.map((opportunity, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-blue-100">{opportunity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-blue-200">No market intelligence data available for this scenario.</p>
            )}
          </div>
        )}
      </div>
      
      {/* Continue button */}
      <div className="flex justify-end">
        <button
          onClick={onContinue}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
        >
          Proceed to Decision
        </button>
      </div>
    </div>
  );
};

export default ScenarioView;