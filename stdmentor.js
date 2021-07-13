const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();

const port = process.env.PORT || 4000;


var mentorlist = [
    { id: 1, name: 'venkat', student: [] },
    { id: 2, name: "bharani", student: [] },
    { id: 3, name: 'balan', student: [] },
    { id: 4, name: "tamil", student: [] },
];
var studentlist = [
    { id: 1, name: "ram", mail: "ram@gmail.com", mentor: [1] },
    { id: 2, name: "som", mail: "som@gmail.com", mentor: [2] },
    { id: 3, name: "yugesh ", mail: "yugesh@gmail.com", mentor: [3] },
    { id: 4, name: "dev", mail: "dev@gmail.com", mentor: [4] },
]


// get all mentorlist 
app.get("/mentorlist", (req, res) => {
    res.send(mentorlist);
})
// get all studentlist 
app.get("/studentlist", (req, res) => {
    res.json(studentlist)
});
// get particular mentor 

app.get("/mentorlist/:id", (req, res) => {
    const mentor = mentorlist.find((mentor) => {
        return mentor.id === parseInt(req.params.id)
    })
    if (!mentor) res.status(404).send("Mentor not found")
    res.send(mentor)

})


// get particular student 
app.get("/studentlist/:id", (req, res) => {
    const student = studentlist.find((student) => {
        return student.id === parseInt(req.params.id)
    })
    if (!student) {
        res.status(404).send("Student not found");
    }
    res.send(student)

})
// create mentor 
app.post("/create_mentor", (req, res) => {
    mentorlist.push(req.body);
    console.log(req.body)
    res.send("updated")
})

// create student 
app.post("/create_student", (req, res) => {

    studentlist.push(req.body);
    console.log(req.body);
    res.send(`studentlist updated`)
})

/** assign mentor to a student */
app.put("/change_mentor/:id", (req, res) => {


    const student = studentlist.find(s => s.id === parseInt(req.params.id));
    if (!student) res.status(404).send("student not found");
    const mentor_name = req.body
    //student.mentor=""
    student.mentor.push(mentor_name)
    res.send("updated successfully")
    console.log(student)

})




/** assign student to a mentor */
app.post("/assign_student/:id", (req, res) => {
    var mentor = mentorlist.find(mentor => mentor.id === parseInt(req.params.id))
    if (!mentor) res.status(404).send("mentor not found")
    console.log(mentor)
    const studentdetail = {
        name: req.body.name,
        id: req.body.id

    }
    mentor.student.push(studentdetail)
    res.send(`student with name ${studentdetail.name} assigned to ${mentor.name}`)
})

app.delete("/delete_mentor/:id", (req, res) => {
    let id = parseInt(req.params.id)
    mentorlist.splice(id, 1)
    res.send("deleted successfully")

})
app.delete("/delete_student/:id", (req, res) => {
    let id = parseInt(req.params.id)
    studentlist.splice(id, 1)
    res.send("deleted successfully")

})


app.listen(port, () => console.log("started"))