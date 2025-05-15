'use client';

export default function AboutPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-6">
            <h1 className="text-3xl font-bold">About Kerry&apos;s Tool</h1>
            <p className="text-muted-foreground text-lg">
                <strong>Kerry&apos;s Tool</strong> is a comprehensive hospital
                management system designed to simplify, streamline, and secure
                all aspects of clinical operations — from patient records to
                administrative workflows.
            </p>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Our Mission</h2>
                <p>
                    Our mission is to empower healthcare professionals and
                    institutions with reliable, modern tools that enhance
                    efficiency, reduce errors, and improve patient care. We
                    believe that technology should serve the needs of medical
                    teams — not the other way around.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Core Features</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>Real-time patient tracking and medical records</li>
                    <li>Appointment and scheduling system</li>
                    <li>Billing, insurance, and inventory integration</li>
                    <li>Secure access control for staff and departments</li>
                    <li>Customizable dashboards and analytics</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    Why Kerry&apos;s Tool?
                </h2>
                <p>
                    Designed with feedback from healthcare professionals,
                    Kerry&apos;s Tool adapts to your workflow, supports rapid
                    growth, and ensures patient data is handled with care,
                    confidentiality, and compliance.
                </p>
            </div>

            <div className="pt-6 border-t text-sm text-muted-foreground">
                &copy; 2025 Kerry&apos;s Tool. All rights reserved.
            </div>
        </div>
    );
}
