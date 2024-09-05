import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Link,
} from "@mui/material";
import Image from "next/image";

import user1 from "@/../../public/images/backgrounds/u2.jpg";
import user2 from "@/../../public/images/backgrounds/u3.jpg";
import user3 from "@/../../public/images/backgrounds/u4.jpg";

interface menuList {
  imageIcon: string | null;
  href: string;
  menuName: string;
}

interface CardProps {
  data: menuList[];
}

const MenuCard: React.FC<CardProps> = ({ data }) => {
  return (
    <Grid container spacing={3}>
      {data.map((menu, index) => (
        <Grid
          key={index}
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card
            sx={{
              p: 0,
              width: "100%",
            }}
          >
            {" "}
            {menu.imageIcon ? (
              <Image
                src={menu.imageIcon}
                alt="img"
                style={{ width: "100%", height: "250px" }}
              />
            ) : (
              ""
            )}
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >
              <Typography variant="h4">{menu.menuName}</Typography>
              <Link href={menu.href ? menu.href : "#"}>
                <Button
                  variant="contained"
                  sx={{
                    mt: "15px",
                    backgroundColor: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.main",
                    },
                  }}
                >
                  Manage
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MenuCard;
