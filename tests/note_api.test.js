const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const connectDB = require("../config/DB");
const Note = require("../models/Note");

const helper = require("./test_helper");

connectDB();

const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({});

  // let noteObject = new Note(helper.initialNotes[0]);
  // await noteObject.save();

  // noteObject = new Note(helper.initialNotes[1]);
  // await noteObject.save();
  await Note.insertMany(helper.initialNotes);
});

// test("note without content is not added", async () => {
//   const newNote = {
//     important: true,
//   };

//   await api.post("/api/notes").send(newNote).expect(400);

//   const response = await api.get("/api/notes");

//   expect(response.body).toHaveLength(helper.initialNotes.length);
// });

// test("notes are returned as json", async () => {
//   await api
//     .get("/api/notes")
//     .expect(200)
//     .expect("Content-Type", /application\/json/);
// }, 10000);

// test("there are two notes", async () => {
//   const response = await api.get("/api/notes");

//   console.log(response.body);

//   expect(response.body).toHaveLength(2);
// });

// test("the first note is about HTTP methods", async () => {
//   const response = await api.get("/api/notes");

//   expect(response.body[0].content).toBe("HTML is easy");
// });

// test("a specific note is within the returned notes", async () => {
//   const response = await api.get("/api/notes");

//   const contents = response.body.map((r) => r.content);
//   console.log(contents);

//   expect(contents).toContain("Browser can execute only Javascript");
// });

// test("a valid note can be added ", async () => {
//   const newNote = {
//     content: "async/await simplifies making async calls",
//     important: true,
//   };

//   await api
//     .post("/api/notes")
//     .send(newNote)
//     .expect(200)
//     .expect("Content-Type", /application\/json/);

//   const notesAtEnd = await helper.notesInDb();
//   expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

//   const contents = notesAtEnd.map((n) => n.content);
//   expect(contents).toContain("async/await simplifies making async calls");
// });

// test("a specific note can be viewed", async () => {
//   const notesAtStart = await helper.notesInDb();

//   const noteToView = notesAtStart[0];

//   const resultNote = await api
//     .get(`/api/notes/${noteToView.id}`)
//     .expect(200)
//     .expect("Content-Type", /application\/json/);

//   console.log(resultNote.body);

//   const processedNoteToView = JSON.parse(JSON.stringify(noteToView));

//   expect(resultNote.body).toEqual(processedNoteToView);
// });

describe("when there is initially some notes saved", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all notes are returned", async () => {
    const response = await api.get("/api/notes");

    expect(response.body).toHaveLength(helper.initialNotes.length);
  });

  test("a specific note is within the returned notes", async () => {
    const response = await api.get("/api/notes");

    const contents = response.body.map((r) => r.content);

    expect(contents).toContain("Browser can execute only Javascript");
  });
});

describe("viewing a specific note", () => {
  test("succeeds with a valid id", async () => {
    const notesAtStart = await helper.notesInDb();

    const noteToView = notesAtStart[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const processedNoteToView = JSON.parse(JSON.stringify(noteToView));

    expect(resultNote.body).toEqual(processedNoteToView);
  });

  test("fails with statuscode 404 if note does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();

    console.log(validNonexistingId);

    await api.get(`/api/notes/${validNonexistingId}`).expect(404);
  });

  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/notes/${invalidId}`).expect(400);
  });
});

describe("addition of a new note", () => {
  test("succeeds with valid data", async () => {
    const newNote = {
      content: "async/await simplifies making async calls",
      important: true,
    };

    await api
      .post("/api/notes")
      .send(newNote)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

    const contents = notesAtEnd.map((n) => n.content);
    expect(contents).toContain("async/await simplifies making async calls");
  });

  test("fails with status code 400 if data invaild", async () => {
    const newNote = {
      important: true,
    };

    await api.post("/api/notes").send(newNote).expect(400);

    const notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
  });
});

describe("deletion of a note", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

    const notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

    const contents = notesAtEnd.map((r) => r.content);

    expect(contents).not.toContain(noteToDelete.content);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
