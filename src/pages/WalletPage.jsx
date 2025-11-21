// src/pages/WalletPage.jsx
import React from 'react';

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

const WalletPage = () => {
  const transactions = [
    { id: 1, type: 'earned', amount: '$250', desc: 'Dark Souls dare completed', date: '2 hours ago' },
    { id: 2, type: 'withdrawn', amount: '$500', desc: 'Withdrawal to PayPal', date: '1 day ago' },
    { id: 3, type: 'earned', amount: '$75', desc: 'Singing dare completed', date: '2 days ago' },
    { id: 4, type: 'earned', amount: '$100', desc: 'Hot wings challenge', date: '3 days ago' },
  ];

  return (
    <>
      <div style={{ 
        marginBottom: '3rem', 
        textAlign: 'center', 
        marginTop : '45px'
     
      }}>
        <h1 style={{
          fontSize: '3.5rem', fontWeight: 900,
          background: `linear-gradient(135deg, ${COLORS.neonYellow} 0%, ${COLORS.neonCyan} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
        }}>💰 MY WALLET</h1>
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${COLORS.neonYellow}15 0%, rgba(26, 26, 26, 0.9) 100%)`,
        borderRadius: '20px', padding: '3rem', marginBottom: '3rem',
        border: `2px solid ${COLORS.neonYellow}`,
        boxShadow: `0 0 40px ${COLORS.neonYellow}30`,
        textAlign: 'center',
      }}>
        <div style={{ color: '#999', fontSize: '1.2rem', marginBottom: '1rem' }}>Available Balance</div>
        <div style={{
          fontSize: '4rem', fontWeight: 900, color: COLORS.neonYellow,
          textShadow: `0 0 40px ${COLORS.neonYellow}`, marginBottom: '2rem',
        }}>$2,847.00</div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            padding: '1rem 2rem',
            background: `linear-gradient(135deg, ${COLORS.neonYellow}30 0%, transparent 100%)`,
            border: `2px solid ${COLORS.neonYellow}`, borderRadius: '12px',
            color: COLORS.neonYellow, fontWeight: 'bold', cursor: 'pointer',
            fontSize: '1.1rem', transition: 'all 0.3s',
          }}>💸 WITHDRAW</button>
          <button style={{
            padding: '1rem 2rem',
            background: `linear-gradient(135deg, ${COLORS.neonCyan}30 0%, transparent 100%)`,
            border: `2px solid ${COLORS.neonCyan}`, borderRadius: '12px',
            color: COLORS.neonCyan, fontWeight: 'bold', cursor: 'pointer',
            fontSize: '1.1rem', transition: 'all 0.3s',
          }}>📊 VIEW ANALYTICS</button>
        </div>
      </div>

      <h2 style={{
        fontSize: '2rem', fontWeight: 'bold', color: COLORS.neonCyan,
        marginBottom: '2rem', textShadow: `0 0 20px ${COLORS.neonCyan}`,
      }}>Recent Transactions</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {transactions.map(tx => (
          <div key={tx.id} style={{
            background: 'rgba(26, 26, 26, 0.9)', borderRadius: '12px', padding: '1.5rem',
            border: `1px solid ${tx.type === 'earned' ? COLORS.neonYellow : COLORS.neonMagenta}30`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {tx.desc}
              </div>
              <div style={{ color: '#999', fontSize: '0.9rem' }}>{tx.date}</div>
            </div>
            <div style={{
              fontSize: '1.5rem', fontWeight: 'bold',
              color: tx.type === 'earned' ? COLORS.neonYellow : COLORS.neonMagenta,
            }}>
              {tx.type === 'earned' ? '+' : '-'}{tx.amount}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WalletPage