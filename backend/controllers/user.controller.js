const db = require('../models');
const { Device, Application } = db;
const { execFile } = require('child_process');
const fs = require('fs');


// Get current user's device and installed apps
exports.getUserDeviceWithApps = async (req, res) => {
  try {
    const userId = req.params.userId; // Extracted from JWT middleware

    const device = await Device.findOne({
      where: { userId },
      include: [
        {
          model: Application
        }
      ]
    });

    if (!device) {
      return res.status(404).json({ message: 'Device not found for this user' });
    }

    res.json({ device });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch device and apps' });
  }
};

exports.reinstallApplication = async (req, res) => {
  const { appId } = req.params;

  try {
    const app = await Application.findByPk(appId);
    if (!app) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (app.name === 'Gauge') {
      // Use a raw string for the path
      const cmdPath = 'C:\\Users\\anshp\\OneDrive\\Desktop\\Installation\\install.cmd';
      console.log('Installer path:', cmdPath);

      if (!fs.existsSync(cmdPath)) {
        return res.status(404).json({ message: 'Installer file not found at path', cmdPath });
      }

      // Use cmd.exe to run the .cmd file
      execFile('cmd.exe', ['/c', cmdPath], (error, stdout, stderr) => {
        if (error) {
          console.error('CMD error:', error);
          return res.status(500).json({ message: `Error running installer: ${error.message}`, stderr });
        }
        // Update status or flag after successful execution
        Application.update(
          { reinstallRequired: false },
          { where: { id: appId } }
        ).then(() => {
          res.json({
            message: 'Application reinstalled successfully',
            application: { ...app.toJSON(), reinstallRequired: 0 },
            output: stdout
          });
        }).catch((dbError) => {
          console.error('DB update error:', dbError);
          res.status(500).json({ message: 'Application reinstalled but failed to update DB', dbError });
        });
      });
    } else {
      // Simple logic: just update DB and respond
      await Application.update(
        { reinstallRequired: false },
        { where: { id: appId } }
      );
      const updatedApp = await Application.findByPk(appId);
      res.json({
        message: 'Application marked as reinstalled (no script run)',
        application: updatedApp
      });
    }
  } catch (error) {
    console.error('Reinstall error:', error);
    res.status(500).json({ message: 'Failed to reinstall application' });
  }
};
