import React from 'react'; // Added import React if it was missing

// FIX: Define COLORS object to prevent ReferenceError
const COLORS = {
  neonCyan: '#00fff7',
  neonMagenta: '#ff00ff',
  neonYellow: '#fffc00',
  neonPurple: '#b800ff',
  darkBg: '#0a0a0a',
  cardBg: 'rgba(26, 26, 26, 0.8)',
  glowCyan: 'rgba(0, 255, 247, 0.3)',
  glowMagenta: 'rgba(255, 0, 255, 0.3)',
  glowYellow: 'rgba(255, 252, 0, 0.3)',
};


const LeaderboardPage = () => {
  const leaderboard = [
    { rank: 1, username: 'CyberGod_X', earnings: '$15,420', dares: 287, avatar: 'C', color: COLORS.neonYellow },
    { rank: 2, username: 'DareMaster_47', earnings: '$12,890', dares: 251, avatar: 'D', color: COLORS.neonCyan },
    { rank: 3, username: 'StreamQueen', earnings: '$10,567', dares: 198, avatar: 'S', color: COLORS.neonMagenta },
    { rank: 4, username: 'EpicPlayer_99', earnings: '$8,234', dares: 176, avatar: 'E', color: COLORS.neonPurple },
    { rank: 5, username: 'TheChaosKing', earnings: '$7,891', dares: 165, avatar: 'T', color: COLORS.neonCyan },
    { rank: 6, username: 'Player_X', earnings: '$2,847', dares: 142, avatar: 'P', color: COLORS.neonYellow, isUser: true },
  ];

  return (
    <>
      <div style={{ marginBottom: '3rem', textAlign: 'center',  
        marginTop: '45px' }}>
        <h1 style={{
          fontSize: '3.5rem', fontWeight: 900,
          background: `linear-gradient(135deg, ${COLORS.neonPurple} 0%, ${COLORS.neonCyan} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
        }}>🏆 LEADERBOARD</h1>
        <p style={{ fontSize: '1.2rem', color: '#999' }}>Top players this month</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {leaderboard.map(p => (
          <div key={p.rank} style={{
            background: p.isUser ? `linear-gradient(135deg, ${COLORS.neonYellow}15 0%, rgba(26, 26, 26, 0.9) 100%)` : 'rgba(26, 26, 26, 0.9)',
            borderRadius: '16px', padding: '2rem',
            border: `2px solid ${p.isUser ? COLORS.neonYellow : 'rgba(255, 255, 255, 0.1)'}`,
            boxShadow: p.isUser ? `0 0 30px ${COLORS.neonYellow}30` : 'none',
            display: 'flex', alignItems: 'center', gap: '2rem',
          }}>
            <div style={{
              fontSize: '2.5rem', fontWeight: 'bold',
              color: p.rank <= 3 ? COLORS.neonYellow : '#999',
              minWidth: '60px', textAlign: 'center',
            }}>
              {p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : `#${p.rank}`}
            </div>
            
            <div style={{
              width: '70px', height: '70px', borderRadius: '50%',
              background: `linear-gradient(135deg, ${p.color} 0%, ${p.color}60 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', fontWeight: 'bold', color: 'white',
              boxShadow: `0 0 20px ${p.color}60`,
            }}>{p.avatar}</div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
                {p.username}
                {p.isUser && <span style={{ color: COLORS.neonYellow, marginLeft: '0.5rem' }}>(You)</span>}
              </div>
              <div style={{ color: '#999' }}>🎯 {p.dares} dares completed</div>
            </div>

            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: p.color, textShadow: `0 0 20px ${p.color}80` }}>
              {p.earnings}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LeaderboardPage