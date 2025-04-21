import { TestConnection } from '@/components/TestConnection';
import { ContentDisplay } from '@/components/ContentDisplay';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Moodster Mix</h1>
        <TestConnection />
        <div className="mt-8">
          <ContentDisplay />
        </div>
      </div>
    </main>
  );
} 