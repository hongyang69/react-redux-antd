import _ from "lodash";

const names = [
  "RudoIf Tilaar",
  "Henry Alexis",
  "Ewa",
  "Taylor H",
  "Brian",
  "Brant",
  "Cary",
  "Edwin",
  "Elliott",
  "Robinson",
  "Randolph",
  "Randy",
  "Reed",
  "Rex",
  "Richard"
];

const admin = {
  id: 0,
  username: "admin",
  roles: ["ROLE_ADMIN"],
  fullname: "Brant",
  email: "hmily0211@hotmail.com",
  phone: "12321313",
  avatar: "111",
  password: "1234",
  photo: {}
};
const user1 = {
  id: 1,
  roles: ["ROLE_STAFF"],
  username: "user1",
  fullname: "Cary",
  email: "hmily0211@hotmail.com",
  phone: "12321313",
  avatar: "111",
  password: "1234",
  photo: {}
};
const user2 = {
  id: 2,
  roles: ["ROLE_STAFF", "ROLE_MANAGER"],
  username: "user2",
  fullname: "Randolph",
  email: "hmily0211@hotmail.com",
  phone: "12321313",
  avatar: "111",
  password: "1234",
  photo: {}
};

export const getMockUsers = ({ offset, max }) => ({
  users: [admin, user1, user2],
  total: 3,
  offset
});

export const getMockUser = id => {
  switch (id) {
    case "0":
      return admin;
    case "1":
      return user1;
    case "2":
      return user2;
    default:
      return null;
  }
};

export const mockUserLogin = ({ username, password }) => {
  switch (username) {
    case "admin":
      if (password === admin.password) {
        return admin;
      }
      return null;
    case "user1":
      if (password === user1.password) {
        return user1;
      }
      return null;
    case "user2":
      if (password === user2.password) {
        return user2;
      }
      return null;
    default:
      return null;
  }
};

const genderIndex = ["male", "female"];

const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const images = ids.map(index => {
  return "http://lorempixel.com/128/128/nature/" + index;
});
const dates = ["1979-06-10", "1988-10-15", "1993-02-10"];
const letters = ["a", "b", "c", "d", "e", "f", "g"];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}
