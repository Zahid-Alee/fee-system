import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./layouts";
import ViewFee from "./pages/dashboard/student_fees/ViewFee";

function App({user}) {
  return (
    <Routes>
      <Route  path="/dashboard/*" element={<Dashboard user={user} />} />
      {/* <Route  path="/dashboard/my-fee/:id" element={<ViewFee />} /> */}
      
    </Routes>
  );
}

export default App;
