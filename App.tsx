import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { DeleteAccountProvider } from './hooks/DeleteAccountContext';
import { ExpandHoverProvider } from './hooks/ExpandHoverContext';
import { CompetitionDetails } from './types';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Settings from './pages/Settings';
import CreateCompetition from './pages/CreateCompetition';
import Dashboard from './pages/Dashboard';
import NewCompetitions from './components/dashboard/NewCompetitions';
import CompetitionDetailsComp from './atoms/dashboard/CompetitionDetails';
import ApprovedCompetitions from './components/dashboard/ApprovedCompetitions';
import DeclinedCompetitions from './components/dashboard/DeclinedCompetitions';
import UnderReview from './components/dashboard/UnderReview';
import UsersInformation from './components/dashboard/UsersInformation';
import MainLayout from './components/MainLayout';
import CompetitionPage from './pages/CompetitionPage';
import Overview from './components/competition/Overview';
import Submissions from './components/competition/Submissions';
import Discussions from './components/competition/Discussions';
import Leaderboard from './atoms/common/Timeline';
// import Rules from './atoms/dashboard/Rules';

import DashboardOverview from './atoms/dashboard/Overview';
import DashboardResources from './atoms/dashboard/Resources';
import DashboardRules from './atoms/dashboard/Rules';
import DashboardFeedback from './atoms/dashboard/Feedback';

import AccountSettings from './components/settings/AccountSettings';
import NotificationsSettings from './components/settings/NotificationsSettings';
import Competitions from './pages/Competitions';
import DiscussionDetails from './atoms/competition/DiscussionDetails';

function App() {
  const [competitions, setCompetitions] = useState<CompetitionDetails[]>([]);

  useEffect(() => {
    const savedCompetitions = JSON.parse(
      localStorage.getItem('competitions') as string
    );
    if (savedCompetitions && savedCompetitions.length > 0) {
      setCompetitions(savedCompetitions);
    } else {
      // setCompetitions(initialCompetitions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('competitions', JSON.stringify(competitions));
  }, [competitions]);

  return (
    <ExpandHoverProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/settings"
              element={
                <DeleteAccountProvider>
                  <Settings />
                </DeleteAccountProvider>
              }
            >
              <Route path="account" element={<AccountSettings />} />
              <Route path="notifications" element={<NotificationsSettings />} />
              <Route path="" element={<AccountSettings />} />
            </Route>
            <Route path="/create-competition" element={<CreateCompetition />} />
            <Route path="/" element={<Competitions />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="new" element={<NewCompetitions />} />

              <Route path=":state/:id" element={<CompetitionDetailsComp />}>
                <Route
                  path="overview"
                  element={
                    <DashboardOverview
                      competition={
                        competitions.find(
                          (competition) => competition.id.toString() === ':id'
                        )!
                      }
                    />
                  }
                />
                <Route
                  path="rules"
                  element={
                    <DashboardRules
                      competition={
                        competitions.find(
                          (competition) => competition.id.toString() === ':id'
                        )!
                      }
                    />
                  }
                />
                <Route path="resources" element={<DashboardResources />} />
                <Route path="feedback" element={<DashboardFeedback />} />
              </Route>

              <Route path="approved" element={<ApprovedCompetitions />} />
              <Route path="declined" element={<DeclinedCompetitions />} />
              <Route path="under-review" element={<UnderReview />} />
              <Route path="users-information" element={<UsersInformation />} />
              <Route path="" element={<UnderReview />} />
            </Route>

            <Route path="/competitions">
              <Route
                path=":id"
                element={
                  <MainLayout>
                    <CompetitionPage />
                  </MainLayout>
                }
              >
                <Route path="overview" element={<Overview />} />
                <Route
                  path="submissions"
                  element={
                    <Submissions
                      competition={
                        competitions.find(
                          (competition) => competition.id.toString() === ':id'
                        )!
                      }
                    />
                  }
                />
                <Route path="discussions">
                  <Route path=":discussionId" element={<DiscussionDetails />} />
                  <Route path="" element={<Discussions />} />
                </Route>
                <Route path="leaderboard" element={<Leaderboard />} />
                <Route
                  path="rules"
                  element={
                    <DashboardOverview
                      competition={
                        competitions.find(
                          (competition) => competition.id.toString() === ':id'
                        )!
                      }
                    />
                  }
                />
                <Route path="" element={<Overview />} />
              </Route>
              <Route path="" element={<Competitions />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ExpandHoverProvider>
  );
}

export default App;
