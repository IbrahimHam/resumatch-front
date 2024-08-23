import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FEF9C3",
    padding: 30,
  },
  header: {
    fontSize: 30,
    marginBottom: 10,
    color: "#9A3412",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 20,
    color: "#B45309",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#B45309",
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: "#1F2937",
  },
  bold: {
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },
});

const PDFTemplateFive = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>{data.name}</Text>
      <Text style={styles.subHeader}>{data.title}</Text>

      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "30%", marginRight: 10 }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Kontakt</Text>
            <Text style={styles.text}>{data.contactInfo.email}</Text>
            <Text style={styles.text}>{data.contactInfo.phone}</Text>
            <Text style={styles.text}>{data.contactInfo.address}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sprachen</Text>
            {data.languages.map((lang, index) => (
              <Text key={index} style={styles.text}>
                {lang}
              </Text>
            ))}
          </View>
        </View>

        <View style={{ width: "70%" }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profil</Text>
            <Text style={styles.text}>{data.summary}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Berufserfahrung</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={[styles.text, styles.bold]}>{exp.jobTitle}</Text>
                <Text style={styles.text}>{exp.company}</Text>
                <Text style={styles.text}>
                  {exp.startDate} - {exp.endDate}
                </Text>
                <Text style={styles.text}>{exp.description}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bildung</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={[styles.text, styles.bold]}>
                  {edu.institution}
                </Text>
                <Text style={styles.text}>{edu.degree}</Text>
                <Text style={styles.text}>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFTemplateFive;
