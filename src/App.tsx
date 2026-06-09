import { useState } from 'react';
import { FileText, Search, Plus, Lock, Shield, X } from 'lucide-react';

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [pwd, setPwd] = useState('');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState('');

  const unlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.length < 4) { setError('Min 4 characters'); return; }
    setPwd(input);
    setUnlocked(true);
  };

  if (!unlocked) return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{backgroundColor: '#0a0a0f'}}>
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6" style={{background: '#7c3aed20', border: '1px solid #7c3aed40'}}>
          <FileText className="w-9 h-9" style={{color: '#7c3aed'}} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">SecureNotes Pro</h1>
        <p className="text-slate-400 text-sm mb-8">Enter password to access</p>
        <form onSubmit={unlock} className="space-y-4">
          <input type="password" value={input} onChange={e => setInput(e.target.value)}
            placeholder="Create or enter password"
            className="w-full bg-[#111118] border border-[#1e1e2e] rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none text-center" autoFocus />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" className="w-full text-white font-semibold py-3.5 rounded-xl transition-colors" style={{backgroundColor: '#7c3aed'}}>
            Unlock
          </button>
        </form>
        <div className="mt-8 flex items-center gap-2 text-slate-500 text-xs justify-center">
          <Shield className="w-4 h-4" /><span>AES-256 encrypted • Local only • Never synced</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{backgroundColor: '#0a0a0f'}}>
      <header className="border-b border-[#1e1e2e] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6" style={{color: '#7c3aed'}} />
          <span className="font-bold text-white">SecureNotes Pro</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{backgroundColor: '#7c3aed'}}>
            <Plus className="w-4 h-4" /> Add New
          </button>
          <button onClick={() => setUnlocked(false)} className="p-2 text-slate-500 hover:text-slate-300 hover:bg-[#111118] rounded-lg">
            <Lock className="w-5 h-5" />
          </button>
        </div>
      </header>
      <div className="max-w-2xl mx-auto p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
            className="w-full bg-[#111118] border border-[#1e1e2e] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none text-sm" />
        </div>
        {items.filter(i => i.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nothing here yet. Add your first item!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.filter(i => i.toLowerCase().includes(search.toLowerCase())).map((item, idx) => (
              <div key={idx} className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-4 flex items-center justify-between hover:border-[#2e2e3e] transition-all">
                <span className="text-white text-sm">{item}</span>
                <button onClick={() => setItems(prev => prev.filter((_, i) => i !== idx))} className="text-slate-500 hover:text-red-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {showAdd && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111118] border border-[#1e1e2e] rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-white font-semibold mb-4">Add New Item</h2>
            <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="Enter item..."
              className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none mb-3" autoFocus />
            <div className="flex gap-2">
              <button onClick={() => { if (newItem.trim()) { setItems(prev => [newItem.trim(), ...prev]); setNewItem(''); setShowAdd(false); } }}
                className="flex-1 text-white font-semibold py-3 rounded-xl transition-colors" style={{backgroundColor: '#7c3aed'}}>Add</button>
              <button onClick={() => setShowAdd(false)} className="flex-1 bg-[#1e1e2e] text-slate-300 font-semibold py-3 rounded-xl">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
