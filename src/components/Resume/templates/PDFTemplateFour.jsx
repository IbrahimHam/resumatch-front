import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Stilleri tanımlayın
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    marginBottom: 10,
  },
  col1: {
    width: "30%",
    backgroundColor: "#E6F3FF", // light blue for bg-blue-50
    padding: 10,
  },
  col2: {
    width: "70%",
    padding: 10,
  },
  fullWidth: {
    width: "100%",
    backgroundColor: "#CCE5FF", // light blue for bg-blue-100
    padding: 10,
    marginBottom: 10,
  },
});

const PDFTemplateFour = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{data.name}</Text>

        <View style={styles.grid}>
          <View style={styles.col1}>
            <Text style={styles.subtitle}>Persönliche Daten</Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Birthdate:</Text> {data.birthDate}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Address:</Text>{" "}
              {data.contactInfo.address}
            </Text>
          </View>
          <View style={styles.col2}>
            <Text style={styles.subtitle}>Profil</Text>
            <Text style={styles.text}>{data.summary}</Text>
          </View>
        </View>

        <View style={styles.fullWidth}>
          <Text style={styles.subtitle}>Bildungsweg</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={[styles.text, styles.bold]}>{edu.institution}</Text>
              <Text style={styles.text}>{edu.degree}</Text>
              <Text style={styles.text}>
                {edu.startDate} - {edu.endDate}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.grid}>
          <View style={[styles.col2, { backgroundColor: "#CCE5FF" }]}>
            <Text style={styles.subtitle}>Berufserfahrung</Text>
            {data.experience.map((job, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={[styles.text, styles.bold]}>
                  {job.title} - {job.company}
                </Text>
                <Text style={styles.text}>
                  {job.startDate} - {job.endDate}
                </Text>
                <Text style={styles.text}>{job.description}</Text>
              </View>
            ))}
          </View>
          <View style={styles.col1}>
            <Text style={styles.subtitle}>Sprachen</Text>
            {data.languages.map((language, index) => (
              <Text key={index} style={styles.text}>
                {language}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFTemplateFour;
