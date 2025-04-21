import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const TestConnection = () => {
  const [status, setStatus] = useState<string>('Checking connection...');
  const [tables, setTables] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Test basic connection
        const { data, error } = await supabase.from('profiles').select('*').limit(1);
        
        if (error) {
          setError(`Connection error: ${error.message}`);
          setStatus('Failed to connect to Supabase');
          return;
        }

        // Get list of tables
        const { data: tablesData, error: tablesError } = await supabase
          .from('information_schema.tables')
          .select('table_name')
          .eq('table_schema', 'public');
        
        if (tablesError) {
          setError(`Tables error: ${tablesError.message}`);
          setStatus('Connected but failed to fetch tables');
          return;
        }
        
        setTables(tablesData.map(t => t.table_name));
        setStatus('Connected to Supabase!');
        setError(null);
      } catch (error) {
        console.error('Error checking connection:', error);
        setError(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setStatus('Failed to connect to Supabase');
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="p-4 bg-black/50 rounded-lg border border-white/10">
      <h2 className="text-xl font-bold text-white mb-2">Supabase Connection Test</h2>
      <p className={`mb-4 ${status.includes('Connected') ? 'text-green-400' : 'text-red-400'}`}>
        Status: {status}
      </p>
      
      {error && (
        <div className="mb-4 p-2 bg-red-900/50 rounded text-red-200">
          <p className="font-semibold">Error Details:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {tables.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Available Tables:</h3>
          <ul className="list-disc list-inside text-gray-300">
            {tables.map(table => (
              <li key={table}>{table}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test Connection Again
        </button>
      </div>
    </div>
  );
}; 