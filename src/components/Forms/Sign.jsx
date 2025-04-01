import React, { useState } from "react";
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";

export function Sign() {
  const [data, setData] = useState({
    user: "",
    password: ""
  });

  const [err, setErr] = useState({});

  const handle = (ev) => {
    setData({ ...data, [ev.target.name]: ev.target.value });
  };

  const valid = () => {
    let newErrors = {};

    if (!data.user.trim()) {
      newErrors.user = "user is required";
    } else if (data.user.length < 3) {
      newErrors.user = "at least contain more 2 char";
    }

    if (!data.password.trim()) {
      newErrors.password = "password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "at least contain 6 char";
    }

    setErr(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valid()) {
      alert("done registered");
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            size="lg"
            name="user"
            value={data.user}
            onChange={handle}
            placeholder="Your Name"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          />
          {err.user && <Typography color="red-500">{err.user}</Typography>}

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            name="password"
            value={data.password}
            onChange={handle}
            type="password"
            size="lg"
            placeholder="********"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          />
          {err.password && <Typography color="red-500">{err.password}</Typography>}
        </div>

        <Checkbox
          label={
            <Typography variant="small" color="gray" className="flex items-center font-normal">
              I agree to the
              <a href="#" className="font-medium transition-colors hover:text-gray-900">
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button className="mt-6 bg-black" fullWidth type="submit">
          Sign Up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="#" className="font-medium text-gray-900">
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  );
}

export default Sign;
