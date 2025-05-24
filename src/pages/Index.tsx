
import InternalDashboard from '../components/internal/InternalDashboard';

const Index = () => {
  // This component is now just a wrapper - authentication and routing 
  // is handled in App.tsx
  return <InternalDashboard userRole="admin" />;
};

export default Index;
