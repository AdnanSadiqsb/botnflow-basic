import { FaComments, FaRobot, FaLock as FaLockIcon, FaChartLine } from 'react-icons/fa6';

const VisualPanel = () => {
  return (
    <div className="w-full h-full bg-primary-600 text-white p-6 md:p-12 flex flex-col">
      <div className="lg:h-full flex flex-col">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Communication Tools</h2>
          <p className="text-lg text-primary-100 mb-6">
            Streamline your business communications with our comprehensive CPaaS platform. Connect with customers across
            multiple channels through a single API.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <div className="mt-1 bg-primary-500 p-2 rounded-lg">
                <FaComments />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">Multi-channel APIs</h3>
                <p className="text-primary-100">SMS, voice, video, and chat — all through a unified platform.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 bg-primary-500 p-2 rounded-lg">
                <FaRobot />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">Automation</h3>
                <p className="text-primary-100">Automate customer communications with AI-powered workflows.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 bg-primary-500 p-2 rounded-lg">
                <FaLockIcon />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">Enterprise Security</h3>
                <p className="text-primary-100">End-to-end encryption and compliance with industry standards.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 bg-primary-500 p-2 rounded-lg">
                <FaChartLine />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">Scalability</h3>
                <p className="text-primary-100">Grow from startups to enterprises with flexible infrastructure.</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-auto rounded-xl overflow-hidden shadow-2xl"></div> */}
      </div>
    </div>
  );
};

export default VisualPanel;