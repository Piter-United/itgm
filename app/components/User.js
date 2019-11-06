import React, { useEffect, useState } from "react";
import useStoreon from "storeon/react";
import { Card, Avatar, Spin, Divider, Typography, Button } from "antd";

const { Paragraph } = Typography;

import { parse } from "qs";

import history from "../history";

import { site_url, client_id } from "../config";
import { GET_CURRENT_USER, LOGOUT, SET_USER_TOKEN } from "../store/user";

export const User = () => {
  const [u, setU] = useState(null);
  const { user, dispatch } = useStoreon("user");
  useEffect(() => {
    setU(user);
  }, [setU, user]);
  useEffect(() => {
    dispatch(GET_CURRENT_USER);
  }, [dispatch]);
  if (!u) {
    return <Spin size="large" />;
  }
  console.log(user);
  return (
    <div className="content">
      <Card style={{ width: 450, margin: "20px auto", textAlign: "center" }}>
        {u.photo ? (
          <Avatar size={150} src={u.photo} />
        ) : (
          <Avatar size={150} icon="user" />
        )}
        <Divider />
        <Paragraph
          editable={{ onChange: v => setU({ ...u, name: { formatted: v } }) }}
        >
          {u.name.formatted}
        </Paragraph>
        <Divider />
        <Paragraph editable={{ onChange: v => setU({ ...u, email: v }) }}>
          {u.email}
        </Paragraph>
        <Divider />
        <Paragraph
          editable={{
            onChange: v => setU({ ...u, data: { ...u.data, company: v } })
          }}
        >
          {u.data.company || "Компания"}
        </Paragraph>
        <Divider />
        <Paragraph
          editable={{
            onChange: v =>
              setU({ ...u, data: { ...u.data, specialization: v } })
          }}
        >
          {u.data.specialization || "Специальность"}
        </Paragraph>
        <Divider />
        <Paragraph>Community</Paragraph>
        <Divider />
        <Paragraph>Sub community</Paragraph>
        <Divider />
        <Paragraph>Опыт в IT</Paragraph>
        <Divider />
        <Paragraph
          editable={{
            onChange: v => setU({ ...u, data: { ...u.data, about: v } })
          }}
        >
          {u.data.about || "Био"}
        </Paragraph>
        <Divider />
        <Button>Сохранить</Button>
      </Card>
      <pre>{JSON.stringify(user, "", 2)}</pre>
    </div>
  );
};

export const Login = ({ location: { search } }) => {
  const [error, setError] = useState(null);
  const { dispatch, user } = useStoreon("user");
  useEffect(() => {
    const { code } = parse(search.slice(1));
    const getData = async () => {
      const res = await fetch(`${site_url}/auth/token`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          client_id,
          code,
          grant_type: "authorization_code",
          audience: site_url
        })
      });
      const data = await res.json();
      if (res.status !== 200) {
        console.log(data);
        setError(data.error_description);
      } else {
        dispatch("user/set-user-token", {
          token: data.access_token,
          user: data.userinfo
        });
        history.push("/");
      }
    };
    if (code) {
      getData();
    }
    return () => {};
  }, [search, dispatch]);

  if (user) {
    return <div>Welcome {user.name ? user.name.formatted : user.email}</div>;
  }
  if (error) {
    return <div>Auth error: {error}</div>;
  }
  const { code } = parse(search.slice(1));
  if (!code) {
    return (
      <div>
        <a
          href={`${site_url}/auth/redirect/aidbox?client_id=${client_id}&response_type=code`}
        >
          Login by Aidbox
        </a>
      </div>
    );
  }
  return <div>Auth in process</div>;
};
