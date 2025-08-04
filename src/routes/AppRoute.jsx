import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../component/auth/Login';
import Signup from '../component/auth/Signup';
import ForgotPassword from '../component/auth/ForgotPassword';
import OtpVerification from '../component/auth/OtpVerification';
import Contacts from '../pages/contact/Contact';
import Conversation from '../pages/conversation/Conversation';
import AIAgent from '../pages/aiAgent/AIAgent';
import CreateBroadcast from '../pages/broadcast/CreateBroadcast';
import AgentDashBoard from '../pages/agentDashboard/AgentDashBoard';
import CallAnalytic from '../pages/callanalytics/CallAnalytic';
import Dialer from '../pages/dialer/Dialer';
import CallLogs from '../pages/callLogs/CallLogs';
import CallQueue from '../pages/callQueue/CallQueue';
import Settings from '../pages/settings/Settings';
import FlowsDashboard from '../pages/ReactFlow/FlowsDashboard';
import FlowMain from '../pages/ReactFlow/FlowMain';
import LeadGenerationDashboard from '../pages/dashboard/LeadGenerationDashboard';
import DashboardList from '../pages/dashboard/DashboardList';
import Flow from '../pages/ReactFlow/Flow';
import BroadCast from '../pages/broadcast/BroadCast';
import AiAgentList from '../pages/aiAgent/AiAgentList';
import APICredential from '../pages/apiCredential/APICredential';
import LeadGeneration from '../pages/leadgeneration/LeadGeneration';
import EmailVerification from '../component/auth/EmailVerification ';


function AppRoute() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/verify-otp" element={<OtpVerification />} />


        <Route path="/dashboard" element={<DashboardList />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/conversation" element={<Conversation />} />
        <Route path="/lead-generation" element={<LeadGeneration />} />
        <Route path="/aiagent-list" element={<AiAgentList />} />
        <Route path="/ai-agent" element={<AIAgent />} />
        <Route path="/broadcast" element={<BroadCast />} />
        <Route path="/create-broadcast" element={<CreateBroadcast />} />
        <Route path="/flow-builder" element={<Flow />} />
        <Route path="/flow" element={<FlowMain />} />
        <Route path="/agent-dashboard" element={<AgentDashBoard />} />
        <Route path="/call-analytic" element={<CallAnalytic />} />
        <Route path="/dialer" element={<Dialer />} />
        <Route path="/call-logs" element={<CallLogs />} />
        <Route path="/call-queue" element={<CallQueue />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/api-credential" element={<APICredential />} />
      </Routes>
  );
}

export default AppRoute;