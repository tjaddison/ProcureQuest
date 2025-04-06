import { useState } from 'react';

interface WelcomeScreenProps {
  onStartGame: (playerName: string) => void;
}

const WelcomeScreen = ({ onStartGame }: WelcomeScreenProps) => {
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }
    onStartGame(playerName.trim());
  };

  return (
    <div className="flex flex-col items-center justify-center h-full py-8 px-4">
      <div className="max-w-3xl w-full bg-blue-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 text-center">
          <h1 className="text-5xl font-bold mb-4 text-blue-200">ProcureQuest</h1>
          <h2 className="text-2xl mb-8 text-white">The Supply Chain Challenge</h2>
          
          <div className="mb-8 bg-blue-700 p-6 rounded-xl">
            <p className="text-lg text-blue-100 mb-4">
              Welcome to ProcureQuest, where your procurement decisions shape the future of your company!
            </p>
            <p className="text-md text-blue-200 mb-4">
              You are the new Procurement Manager at GlobalTech Industries. Your decisions will impact the company&apos;s budget, supply chain stability, risk exposure, and reputation.
            </p>
            <p className="text-md text-blue-200">
              Navigate 12 challenging procurement scenarios, analyze data, and make strategic decisions that balance short-term needs with long-term success.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-6">
              <label htmlFor="playerName" className="block text-blue-200 text-sm font-medium mb-2">
                Enter Your Name
              </label>
              <input
                type="text"
                id="playerName"
                value={playerName}
                onChange={(e) => {
                  setPlayerName(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 bg-blue-900 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                placeholder="John Doe"
              />
              {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105"
            >
              Start Your Procurement Journey
            </button>
          </form>
          
          <div className="mt-8 text-blue-300 text-sm">
            <p>Ready to test your procurement skills? Learn about supply chain resilience, ethical sourcing, and strategic supplier management.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;