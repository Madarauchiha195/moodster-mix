import { TestConnection } from '@/components/TestConnection';
import { ContentDisplay } from '@/components/ContentDisplay';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to Moodster Mix</h1>
        <TestConnection />
        <div className="mt-8">
          <ContentDisplay />
        </div>
      </div>
    </main>
  );
} 