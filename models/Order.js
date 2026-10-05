const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    service: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    formData: {
      fullName: String,
      dob: String,
      nationality: String,
      targetJob: String,
      summary: String,
      coverLetter: String,
      email: String,
      phone: String,
      address: String,
      linkedin: String,
      education: [
        {
          institution: String,
          qualification: String,
          startYear: String,
          endYear: String,
        },
      ],
      experience: [
        {
          company: String,
          role: String,
          startDate: String,
          endDate: String,
          description: String,
        },
      ],
      skills: [String],
      languages: [
        {
          name: String,
          level: String,
        },
      ],
      projects: [
        {
          title: String,
          description: String,
          link: String,
        },
      ],
      certificates: [
        {
          name: String,
          issuer: String,
          year: String,
        },
      ],
      awards: [
        {
          title: String,
          issuer: String,
          year: String,
        },
      ],
      references: [
        {
          name: String,
          relationship: String,
          contact: String,
        },
      ],
      interests: [String],
      socialLinks: {
        portfolio: String,
        github: String,
        twitter: String,
      },
    },

    completedFileUrl: {
      type: String,
      default: "",
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", orderSchema);
