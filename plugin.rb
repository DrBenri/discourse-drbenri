# frozen_string_literal: true

# name: discourse-topic-plugin
# about: Runs a custom script when a new topic is created, edited
# version: 0.1
# authors: Hoc Le

enabled_site_setting :plugin_name_enabled

module ::MyPluginModule
  PLUGIN_NAME = "discourse-plugin-name"
end

require_relative "lib/my_plugin_module/engine"


after_initialize do
    DiscourseEvent.on(:topic_created) do |topic, opts, user|
        next if topic.nil?

        Rails.logger.info("Created topic with ID: #{topic.id}")
        # Enqueue job to update secure status after 3 seconds
        Jobs.enqueue_in(3.seconds, :update_secure_status_job, topic_id: topic.id)
    end

    DiscourseEvent.on(:topic_edited) do |topic, opts, user|
        next if topic.nil?
  
        Rails.logger.info("Edited topic with ID: #{topic.id}")
        # Enqueue job to update secure status after 3 seconds
        Jobs.enqueue_in(3.seconds, :update_secure_status_job, topic_id: topic.id)
    end

    DiscourseEvent.on(:post_edited) do |post, opts, user|
        next if post.nil?
  
        Rails.logger.info("Edited post with ID: #{post.id}")
        # Enqueue job to update secure status after 3 seconds
        Jobs.enqueue_in(3.seconds, :update_secure_status_job, topic_id: post.topic_id)
    end
end