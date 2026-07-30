import React from "react";
import ReactDOM from "react-dom/client";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import App from "./App";
import "./style.css";
const client = new ConvexReactClient("https://qualified-puffin-548.eu-west-1.convex.cloud");
ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><ConvexAuthProvider client={client}><App /></ConvexAuthProvider></React.StrictMode>);
