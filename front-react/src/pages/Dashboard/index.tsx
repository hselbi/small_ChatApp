import React from "react";
import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const cardsData = [
  { title: "Chat", content: "DMs", page: "chat" },
  {
    title: "Converstation",
    content: "converstation with someone",
    page: "private",
  },
  { title: "Channels", content: "converstaion in Channels", page: "rooms" },
];

const Dashboard = () => {
  // console.log(cardsData[0].page)
  return (
    <Grid container spacing={8}>
      {cardsData.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Stack direction="row" spacing={8} justifyContent="flex-end">
            <Link to={`/${card.page}`}>
              {/* {console.log(card.page)} */}
              <Card
                sx={{
                  "--Card-padding": "25px",
                  "--Card-radius": "19px",
                }}
                onClick={() => console.log(card.page)}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography color="text.secondary">{card.content}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;
