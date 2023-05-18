const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");
const { check, validationResult } = require("express-validator");

module.exports = router;

router.get("/getCourses", async (req, res) => {
  try {
    let course = await Course.find();
    return res.json(course);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});


router.get("/getCourse", async (req, res) => {
  const { id } = req.body;
  const course = await Course.findById(id);
  res.send(course);
});

router.post(
  "/createCourse",
  async (req, res) => {
    try {
      await (req.body).validate();

      if (!errors.isEmpty()) {
        // Show error if validations failed
        return res.status(400).json({ errors: errors.array() });
      }
      await (req.body).save();
      return res.json({ message: "Success" });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

router.put(
  "/updateCourse/:id",
  async (req, res) => {
    try {
      const id =  parseInt(req.params.id);
      const { courseDetails } = req.body;
      
      const course = await Course.findByIdAndUpdate(
        id, courseDetails
      );
      await course.save();
      return res.json({ course: course });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

router.delete(
  "/delete/:id",
  async (req, res) => {
    try {
      const id =  parseInt(req.params.id);

      let course= await Course.findOneAndDelete({
        _id: id,
      });

      return res.json({ course: course });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);
