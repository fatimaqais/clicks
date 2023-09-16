import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults'
import SignUpForm from "./pages/auth/SignupForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import EventCreateForm from "./pages/events/EventCreateForm";
import PostPage from "./pages/posts/PostPage";
import EventPage from "./pages/events/EventPage"
import PostsPage from "./pages/posts/PostsPage";
import EventsPage from "./pages/events/EventsPage";
import PostEditForm from "./pages/posts/PostEditForm";


function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <PostsPage message="No results found!" />} />
          <Route exact path="/events" render={() => <EventsPage message="No results found!" />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/events/create" render={() => <EventCreateForm />} />
          <Route exact path="/events/:id" render={() => <EventPage />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
