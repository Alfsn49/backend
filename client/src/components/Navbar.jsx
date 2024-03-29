import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from "react-router-dom";
import { ButtonLink } from "./ui/ButtonLink";
function Navbar() {
    const { isAuthenticated,logout, user } = useAuth();
  console.log(isAuthenticated, user)

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
    <h1 className="text-2xl font-bold">
      <Link to={isAuthenticated ? "/tasks" : "/"}>Task Manager</Link>
    </h1>
    <ul className="flex gap-x-2">
      {isAuthenticated ? (
        <>
          <li>
            Welcome {user.username}
          </li>
          <li>
            <ButtonLink to="/add-task">Add Task</ButtonLink>
          </li>
          <li>
            <Link to="/" onClick={() => logout()}>
              Logout
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <ButtonLink to="/login">Login</ButtonLink>
          </li>
          <li>
            <ButtonLink to="/register">Register</ButtonLink>
          </li>
        </>
      )}
    </ul>
  </nav>
  )
}

export default Navbar