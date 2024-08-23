import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  header: {
    backgroundColor: "#1F2937",
    color: "#FFFFFF",
    padding: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 5,
  },
  headerSubText: {
    fontSize: 16,
    marginBottom: 10,
  },
  headerInfo: {
    fontSize: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 13,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  profileSection: {
    backgroundColor: "#efefef",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  experienceSection: {
    backgroundColor: "#efefef",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  languageSection: {
    backgroundColor: "#efefef",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  skillsSection: {
    backgroundColor: "#efefef",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  educationSection: {
    backgroundColor: "#efefef",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textDate: {
    fontSize: 10,
    color: "#4b5563",
    marginBottom: 1,
  },
  textInfo: {
    fontSize: 11,
    marginBottom: 1,
  },
  contentContainer: {
    flexDirection: "row",
    flexGrow: 1,
  },
  column: {
    width: "50%",
    paddingHorizontal: 5,
  },
  textLangs: {
    fontSize: 11,
  },
});

const PDFTemplateOne = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{data.name}</Text>
        <Text style={styles.headerSubText}>{data.title}</Text>
        <View style={styles.headerInfo}>
          <Text>{data.contactInfo.email}</Text>
          <Text>{data.contactInfo.phone}</Text>
          <Text>{data.contactInfo.address}</Text>
        </View>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.text}>{data.summary}</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.column}>
          <View style={[styles.experienceSection, { width: "100%" }]}>
            <Text style={styles.sectionTitle}>Employment</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={[styles.text, styles.bold]}>{exp.jobTitle}</Text>
                <Text style={styles.textInfo}>{exp.company}</Text>
                <Text style={styles.textDate}>
                  {exp.startDate} - {exp.endDate}
                </Text>
                <Text style={styles.textInfo}>{exp.description}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.educationSection, { width: "100%" }]}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={[styles.text, styles.bold]}>
                  {edu.institution}
                </Text>
                <Text style={styles.textInfo}>{edu.degree}</Text>
                <Text style={styles.textDate}>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.column}>
          <View style={[styles.languageSection, { width: "100%" }]}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {data.languages.map((lang, index) => (
              <Text key={index} style={styles.textLangs}>
                {lang}
              </Text>
            ))}
          </View>

          <View style={[styles.skillsSection, { width: "100%" }]}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {data.skills.map((skill, index) => (
              <Text key={index} style={styles.textLangs}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFTemplateOne;
