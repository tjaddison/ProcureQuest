import { useState } from 'react';

interface MultiplayerSetupProps {
  isMultiplayer: boolean;
  roomId: string | null;
  onCreateRoom: (roomName: string) => void;
  onLeaveRoom: () => void;
  onCancel: () => void;
}

const MultiplayerSetup = ({
  isMultiplayer,
  roomId,
  onCreateRoom,
  onLeaveRoom,
  onCancel
}: MultiplayerSetupProps) => {
  const [mode, setMode] = useState<'create' | 'join'>('create');
  const [roomName, setRoomName] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) {
      setError('Please enter a room name');
      return;
    }
    onCreateRoom(roomName.trim());
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-blue-900 p-6 rounded-xl max-w-md w-full">
        <h3 className="text-2xl font-bold text-white mb-4">Multiplayer Setup</h3>
        
        {isMultiplayer ? (
          <div>
            <p className="text-blue-100 mb-4">
              You are currently in room: <span className="font-bold text-green-400">{roomId}</span>
            </p>
            <p className="text-blue-200 text-sm mb-6">
              Share this room code with others so they can join your session.
            </p>
            <div className="flex justify-between">
              <button 
                onClick={onCancel}
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
              >
                Back to Game
              </button>
              <button 
                onClick={onLeaveRoom}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Leave Room
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-blue-100 mb-4">
              Play with others in the same scenario sequence and compare your decisions and outcomes.
            </p>
            
            <div className="flex mb-6">
              <button 
                onClick={() => setMode('create')} 
                className={`flex-1 py-2 ${mode === 'create' ? 'bg-blue-700 text-white' : 'bg-blue-800 text-blue-300'} rounded-l`}
              >
                Create Room
              </button>
              <button 
                onClick={() => setMode('join')} 
                className={`flex-1 py-2 ${mode === 'join' ? 'bg-blue-700 text-white' : 'bg-blue-800 text-blue-300'} rounded-r`}
              >
                Join Room
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="mb-4">
                <label htmlFor="roomName" className="block text-blue-200 text-sm font-medium mb-2">
                  {mode === 'create' ? 'Room Name' : 'Enter Room Code'}
                </label>
                <input
                  type="text"
                  id="roomName"
                  value={roomName}
                  onChange={(e) => {
                    setRoomName(e.target.value);
                    setError('');
                  }}
                  className="w-full px-3 py-2 bg-blue-800 border border-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                  placeholder={mode === 'create' ? 'Enter a room name' : 'Enter the room code'}
                />
                {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                {mode === 'create' ? 'Create Room' : 'Join Room'}
              </button>
            </form>
            
            <button 
              onClick={onCancel}
              className="w-full py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiplayerSetup;